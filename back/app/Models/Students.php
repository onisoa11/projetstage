<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    protected $fillable = [
        'reference',
        'im',
        'nom',
        'cin',
        'situation',
        'dateNaisse',
        'dateMariage',
        'dateDece',
        'dureeMariage',
        'imV',
        'nomV',
        'cinV',
        'dateNaisseV',
        'dateJuissanceV',
        'plA',
        'plV',
        'totalD'
    ];
    protected $table = 'veuves';
    use HasFactory;
}
