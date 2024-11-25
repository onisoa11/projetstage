<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudetsResource extends JsonResource
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
            'id' => $this -> id,
            'im' => $this -> im,
            'nom'=> $this -> nom,
            'dateNaisse'=> $this -> dateNaisse,
            'total' => $this -> total,
            'created_at'=>$this -> created_at,
            'updated_at' => $this -> updated_at,
        ];
    }
}
