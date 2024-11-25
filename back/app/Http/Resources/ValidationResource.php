<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ValidationResource extends JsonResource
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
            'im' => $this -> im,
            'nom' => $this -> nom,
            'date_entree_admin' => $this -> date_entree_admin,
            'date_retraite' => $this -> date_retraite,
            'file_path'=> $this -> file_path,
            'created_at'=>$this -> created_at,
            'updated_at' => $this -> updated_at
        ];
    }
}
