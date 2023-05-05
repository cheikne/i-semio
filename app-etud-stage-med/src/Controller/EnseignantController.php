<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EnseignantController extends AbstractController
{
    #[Route('/enseignant/{id}', name: 'app_enseignant')]
    public function index($id): Response
    {
        if($id == "dashboard"){
            return $this->render('/pages/enseignant.html.twig', [
                'libelleCompetence' => 'Interface enseignant',
                'status_' => 'enseignant'
            ]);
        }
        else if($id == "referentiel"){
            return $this->render('/pages/referentiel.html.twig', [
                'libelleCompetence' => 'Interface enseignant',
                'status_' => 'enseignant'
            ]);
        }
        else if($id == "export"){
            return $this->render('/pages/exportDataEtudiant.html.twig', [
                'libelleCompetence' => 'Interface enseignant',
                'status_' => 'enseignant'
            ]);
        }
    }
}
