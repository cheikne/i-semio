<?php
namespace App\Service;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
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

    public function createCompetences($end_point , $new_compentence):String{
        $response = $this->client->request('POST',  'https://ucacomp.dev.dsi.uca.fr/api/'.$end_point, [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-AUTH-TOKEN'=> '8ca40617607b75313de1481b7ce10ca8'
            ],
            'body' => $new_compentence
        ]);

        return "Tout est bien passé";
    }

    public function updateCompetences($end_point , $to_competence):void{

    }

    public function deleteCompetences($end_point , $this_competence):void{

    }
}