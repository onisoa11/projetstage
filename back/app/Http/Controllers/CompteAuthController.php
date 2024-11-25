<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compte;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CompteAuthController extends Controller
{
    // Afficher tous les comptes
    public function index()
    {
        return Compte::all();
    }

    // Inscription d'un compte
    public function register(Request $request)
    {
        $request->validate([
            'IM' => 'required|string|max:6|unique:table_comptes,IM',
            'Email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        $compte = Compte::create([
            'IM' => $request->IM,
            'Email' => $request->Email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($compte);

        return response()->json([
            'message' => 'Compte créé avec succès',
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('IM', 'password');
    
        // Vérifier si l'IM existe
        $compte = Compte::where('IM', $credentials['IM'])->first();
        if (!$compte) {
            return response()->json(['message' => 'IM incorrect'], 401);
        }
    
        // Vérifier le mot de passe
        if (!Hash::check($credentials['password'], $compte->password)) {
            return response()->json(['message' => 'Mot de passe incorrect'], 401);
        }
    
        // Générer le token JWT
        if (!$token = JWTAuth::fromUser($compte)) {
            return response()->json(['message' => 'Impossible de générer le token'], 500);
        }
    
        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token
        ], 200);
    }

    // Récupérer le profil de l'utilisateur connecté
    public function profile()
    {
        return response()->json(['compte' => Auth::user()]);
    }

    public function logout(Request $request)
{
    // Invalider le token actuel
    $token = $request->header('Authorization'); // Récupérer le token du header
    if ($token) {
        JWTAuth::invalidate($token); // Invalider le token
    }

    return response()->json(['message' => 'Déconnexion réussie'], 200);
}

}
