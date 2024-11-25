<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Compte extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $primaryKey = 'IM';  // Spécifier que IM est la clé primaire
    public $incrementing = false;  // Désactiver l'auto-incrémentation
    protected $keyType = 'string';

    protected $fillable = [
        'IM',
        'Email',
        'password',
    ];
    protected $table = 'table_comptes';

    // Implémentation des méthodes JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
