<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veuve extends Model
{
    protected $fillable = [
        'reference',
        'im',
        'nom',
        'cin',
        'situation',
        'dateNaisse',
        'dateEntreAdmin',
        'dateRetraite',
        'dateMariage',
        'dateDece',
        'dureeMariage',
        'nomV',
        'cinV',
        'dateNaisseV',
        'dateJuissanceV',
        'An',
        'plA',
        'plV',
        'totalD'
    ];
    protected $table = 'veuves';
    use HasFactory;
}
