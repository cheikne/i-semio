<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HistoriqueController extends AbstractController
{
    #[Route('/historique', name: 'app_historique')]
    public function index(): Response
    {
        $json = file_get_contents("json/competences.json");
        $content = json_decode($json,true);
        return $this->render('pages/historique.html.twig', [
            'libelleCompetence' => 'Historique des reponses',
            'competences' => $content['competences'],
            'status_' => 'etudiant'
        ]);
    }
}
