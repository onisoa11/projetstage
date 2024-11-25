<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return[
         'im' => $this -> im,
         'nom' => $this -> nom,
         'dateEntreeAdmin' => $this -> dateEntreeAdmin,
         'dateRetraite' => $this ->  dateRetraite,
         'ficheDemande'=> $this -> ficheDemande,
         'created_at'=>$this -> created_at,
         'updated_at' => $this -> updated_at
        ];
    }
}
