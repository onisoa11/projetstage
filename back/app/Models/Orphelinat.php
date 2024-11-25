<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orphelinat extends Model
{
    use HasFactory;
    protected $fillable = [
        'referenceO',
        'im',
        'nom',
        'dateNaisse',
        'dateRetraite',
        'dateEntreAdmin',
        'dateDece',
        'nomOrphelin',
        'dateNaisseOrphelin',
        'situation',
        'nomTuteur',
        'cinTuteur',
        'dateNaisseTuteur',
        'categoriePension',
        'dateJuissance',
        'AS',
        'plAgent',
        'plOrphelinat',
        'totalDecompte'
    ];
    protected $table = 'orphelinats';
}
