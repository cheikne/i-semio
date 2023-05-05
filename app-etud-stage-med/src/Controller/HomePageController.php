<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomePageController extends AbstractController
{
    #[Route('/home', name: 'app_home_page')]
    public function index(): Response
    {   
        $json = file_get_contents("json/listMenu.json");
        $content = json_decode($json,true);
        return $this->render('pages/home_app.html.twig', [
            'listMenu' => $content["list_menu"],
            'status_' => 'etudiant'
        ]);
    }
}
