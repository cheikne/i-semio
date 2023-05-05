<?php

namespace App\Service;

use Symfony\Component\Ldap\Ldap as LdapSymfo;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class Ldap
{
    private $ldapParameters;
    /**
     * Ldap constructor.
     * @param ParameterBagInterface $parameterBag
     */
    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->ldapParameters = $parameterBag->get("ldap");
    }


    /**
     * @param $username
     * @return string
     */
    public function getDisplayName($username)
    {
        if($infoCompteLdap = $this->ldapQuery($username))
            if(!empty($infoCompteLdap[0]->getAttribute('displayName')))
                return $infoCompteLdap[0]->getAttribute('displayName')[0];

        return '';
    }
    public function getDisplayNameAndMail($username)

    {
        if($infoCompteLdap = $this->ldapQuery($username))
            if(!empty($infoCompteLdap[0]->getAttribute('displayName')))
                return ['displayName' =>$infoCompteLdap[0]->getAttribute('displayName')[0], 'mail' => $infoCompteLdap[0]->getAttribute('mail')[0]];

        return '';
    }

    /**
     * @param $username
     * @return string
     */
    public function getName($username)

    {
        if($infoCompteLdap = $this->ldapQuery($username))
            return $infoCompteLdap[0]->getAttribute('sn')[0];

        return '';
    }


    /**
     * @param $username
     * @return string
     */
    public function getFirstname($username)
    {
        if($infoCompteLdap = $this->ldapQuery($username))
            return $infoCompteLdap[0]->getAttribute('givenName')[0];

        return '';
    }


    /**
     * @param $username
     * @return string
     */
    public function getEmail($username)

    {
        if($infoCompteLdap = $this->ldapQuery($username))
            return $infoCompteLdap[0]->getAttribute('mail')[0];

        return '';
    }


//Si status 9 = enseignant si status 0 = etudiant
    /**
     * @param $username
     * @return string
     */

    public function getStatus($username)
    {
        if($infoCompteLdap = $this->ldapQuery($username))
            return $infoCompteLdap[0]->getAttribute('CLFDstatus')[0];
        return '';
    }


    public function getLdapUsers(string $arg)
    {
        $users = $this->queringUser($arg);
        $arrayUsers = array_map(function ($user) {
            return [
                'uid' => $user->hasAttribute('uid') ? current($user->getAttribute('uid')) : null,
                'email' => $user->hasAttribute('mail') ? current($user->getAttribute('mail')) : null,
                'label' => $user->hasAttribute('displayName') ? (current($user->getAttribute('displayName')) . ' (' . current($user->getAttribute('mail')).')') : null
            ];
        }, $users);
        usort($arrayUsers, function ($u1, $u2) {
            return $u1['label'] < $u2['label'] ? -1 : 1;
        });
        return $arrayUsers;
    }

    public function getAllLdapUsers(string $arg)
    {
        $users = $this->queringAllUser($arg);
        $arrayUsers = array_map(function ($user) {
            return [
                'uid' => $user->hasAttribute('uid') ? current($user->getAttribute('uid')) : null,
                'email' => $user->hasAttribute('mail') ? current($user->getAttribute('mail')) : null,
                'label' => $user->hasAttribute('displayName') ? (current($user->getAttribute('displayName')) . ' (' . current($user->getAttribute('mail')).')') : null,
                'displayName' => $user->hasAttribute('displayName') ? current($user->getAttribute('displayName')) : null
            ];
        }, $users);
        usort($arrayUsers, function ($u1, $u2) {
            return $u1['label'] < $u2['label'] ? -1 : 1;
        });
        return $arrayUsers;
    }
    //Requte enseignant + étudiant
    private function queringAllUser($arg)
    {
        $ldap = LdapSymfo::create('ext_ldap',['connection_string'=>$this->ldapParameters["connection_string"]]);
        $ldap->bind($this->ldapParameters["dn"],$this->ldapParameters["password"]);
        $query = '(&(|(clfdstatus=9)(clfdstatus=0))(|(uid=*' . $arg . '*)(displayName=*' . $arg . '*)(mail=*' . $arg . '*)(cn=*' . $arg . '*))(sn=*))';
        return $ldap->query("dc=uca,dc=fr", $query)->execute()->toArray();

    }
    //Requete juste enseignant
    private function queringUser($arg)
    {
        $ldap = LdapSymfo::create('ext_ldap',['connection_string'=>$this->ldapParameters["connection_string"]]);
        $ldap->bind($this->ldapParameters["dn"],$this->ldapParameters["password"]);
        return $ldap->query("dc=uca,dc=fr", '(&(clfdstatus=9)(|(uid=*' . $arg . '*)(displayName=*' . $arg . '*)(mail=*' . $arg . '*)(cn=*' . $arg . '*))(sn=*))')->execute()->toArray();
    }


    private function ldapQuery($username)
    {
        $ldap = LdapSymfo::create('ext_ldap',['connection_string'=>$this->ldapParameters["connection_string"]]);
        $ldap->bind($this->ldapParameters["dn"],$this->ldapParameters["password"]);
        $infoCompteLdap = $ldap->query("dc=uca,dc=fr", "(&(uid=".$username."))")->execute()->toArray();
        return $infoCompteLdap;
    }

}
