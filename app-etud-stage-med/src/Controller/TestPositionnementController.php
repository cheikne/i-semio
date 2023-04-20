<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestPositionnementController extends AbstractController
{
    #[Route('/test_positionnements/{id_test}', name: 'app_test_positionnement')]
    public function index($id_test): Response
    {
        $json = file_get_contents('json/testPositionnement.json');
        $content = json_decode($json,true);

        return $this->render('pages/test_positionnement.html.twig', [
            'questionnaires_test' => $content[$id_test],
            'id_test' => $id_test
        ]);
    }
}
