<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrphelinatResource extends JsonResource
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
        'referenceO' => $this -> referenceO,
         'im' => $this -> im,
         'nom' => $this -> nom,
         'dateNaisse' => $this -> dateNaisse,
         'dateRetraite' => $this -> dateRetraite,
         'dateEntreAdmin' => $this -> dateEntreAdmin,
         'dateDece' => $this -> dateDece,
         'nomOrphelin' => $this -> nomOrphelin,
         'dateNaisseOrphelin' => $this -> dateNaisseOrphelin,
         'situation' => $this -> situation,
         'nomTuteur' => $this -> nomTuteur,
         'cinTuteur' => $this -> cinTuteur,
         'dateNaisseTuteur' => $this -> dateNaisseTuteur,
         'categoriePension' => $this -> categoriePension,
         'dateJuissance' => $this -> dateJuissance,
         'AS' => $this -> AS,
         'plAgent' => $this -> plAgent,
         'plOrphelinat' => $this -> plOrphelinat,
         'totalDecompte' => $this -> totalDecompte,

        ];
    }
}
