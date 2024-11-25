<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
         'id' => $this -> id,
         'im' => $this -> im,
         'nom' => $this -> nom,
         'cin' => $this -> cin,
         'dateNaisse' => $this -> dateNaisse,
         'localite' => $this ->  localite,
         'situation'=> $this -> situation,
         'categoriePension' => $this ->categoriePension,
         'dateEntreeAdmin' => $this -> dateEntreeAdmin,
         'dateRetraite' => $this -> dateRetraite,
         'AnnuiteService' => $this -> AnnuiteService,
         'dateJuissance' => $this -> dateJuissance,
         'pla' => $this -> pla,
         'total' => $this -> total,
         'created_at'=>$this -> created_at,
         'updated_at' => $this -> updated_at
        ];
    }
}
