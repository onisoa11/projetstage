<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class agen extends Model
{
    use HasFactory;

    
    // Indiquer que la clé primaire est 'im' et non 'id'
    protected $primaryKey = 'im';

    // Indiquer que la clé primaire n'est pas auto-incrémentée
    public $incrementing = false;

    // Indiquer que la clé primaire est de type string
    protected $keyType = 'string';

    protected $fillable = [
        'im',
        'nom',
        'dateEntreeAdmin',
        'dateRetraite',
        'ficheDemande',
    ];
    protected $table = 'agens';
}
