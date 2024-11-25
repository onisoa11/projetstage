<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VeuvesResource extends JsonResource
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
            'reference' => $this -> reference,
            'im' => $this -> im,
            'nom' => $this -> nom,
            'cin' => $this -> cin,
            'situation' => $this -> situation,
            'dateNaisse' => $this -> dateNaisse,
            'dateEntreAdmin' => $this -> dateEntreAdmin,
            'dateRetraite' => $this -> dateRetraite,
            'dateMariage' => $this -> dateMariage,
            'dateDece' => $this -> dateDece,
            'dureeMariage' => $this -> dureeMariage,
            'nomV' => $this -> nomV,
            'cinV' => $this -> cinV,
            'dateNaisseV' => $this -> dateNaisseV,
            'dateJuissanceV' => $this -> dateJuissanceV,
            'An' => $this -> An,
            'plA' => $this -> plA,
            'plV' => $this -> plV,
            'totalD' => $this -> totalD,
            'created_at'=>$this -> created_at,
            'updated_at' => $this -> updated_at
           ];
    }
}
