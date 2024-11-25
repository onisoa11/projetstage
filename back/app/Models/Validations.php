<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Validations extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'im';  // Spécifier que IM est la clé primaire
    public $incrementing = false;  // Désactiver l'auto-incrémentation
    protected $keyType = 'string';  // Spécifier que c'est une clé de type string

    protected $fillable = [
        'nom',
        'im',
        'date_entree_admin',
        'date_retraite',
        'file_path',
    ];
    protected $table = 'validations';

    // Accessor pour obtenir le chemin complet du fichier
    public function getFilePathAttribute($value)
    {
        return asset('storage/app/public/validations' . $value);
    }
}
