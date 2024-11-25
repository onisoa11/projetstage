<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;
    protected $fillable = [
        'im',
        'nom',
        'cin',
        'dateNaisse',
        'localite',
        'situation',
        'categoriePension',
        'dateEntreeAdmin',
        'dateRetraite',
        'AnnuiteService',
        'dateJuissance',
        'pla',
        'total'
    ];

    
    protected $table = 'agents';
}
