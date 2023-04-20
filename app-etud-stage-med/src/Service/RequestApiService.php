<?php
namespace App\Service;
use Symfony\Contracts\HttpClient\HttpClientInterface;
class RequestApiService{

    public function __construct(private HttpClientInterface $client){}
    public function getCompetences($end_point):array{
        $response = $this->client->request(
            'GET',
            'https://ucacomp.dev.dsi.uca.fr/api/'.$end_point,[
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);
        return $response->toArray();
    }

    public function createCompetences($end_pooint , $new_compentence):void{

    }

    public function updateCompetences($end_point , $to_competence):void{

    }

    public function deleteCompetences($end_point , $this_competence):void{

    }
}