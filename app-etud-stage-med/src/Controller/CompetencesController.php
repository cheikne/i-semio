<?php

namespace App\Controller;

use App\Entity\SemioHematologique;
use App\Service\RequestApiService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CompetencesController extends AbstractController
{
    #[Route('/competences/{id_competence}', name: 'app_competences')]
    public function index(Request $request ,  EntityManagerInterface $entityManager , $id_competence , RequestApiService $client): Response
    {
        if($request->isMethod('POST')){
            // dd(json_decode($request->request->get('mydata')));
            $data = json_decode($request->request->get('mydata'));
            $semioHema = new SemioHematologique();
            $i = 0;
            foreach($data as &$value){
                $semioHema->setAppris($value[0]);
                $semioHema->setVuFaire($value[1]);
                $semioHema->setFait($value[2]);
                $semioHema->setAcquis($value[3]);
                $semioHema->setIdUser($i);
                $i++;
                $entityManager->persist($semioHema);
                $semioHema = new SemioHematologique();
            }
            $entityManager->flush();
            return new JsonResponse(['success' => true]);
        }
        $json = file_get_contents("json/competences.json");
        $content = json_decode($json,true);
        return $this->render('competences/index.html.twig', [
            'id_competence' => $id_competence,
            'libelleCompetence'=>$content['competences'][$id_competence],
            'sous_competences'=> $content[$id_competence],
            'items' => $content['items'],
            'services' => $content['services']
        ]);
    }
}
