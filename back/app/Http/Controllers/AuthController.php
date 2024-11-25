<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Méthode d'inscription
    public function register(Request $request)
{
    $validated = $request->validate([
        'IM' => 'required|string|max:255|unique:users',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6',
    ]);

    try {
        User::create([
            'IM' => $validated['IM'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => 'User registered successfully!'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to register user.'], 500);
    }
}


    // Méthode de connexion
    public function login(Request $request)
    {
        $request->validate([
            'IM' => 'required|string',  // Remplacer 'email' par 'IM'
            'password' => 'required|string',
        ]);

       if (!Auth::attempt($request -> only('IM', 'password'))) {
            return response()->json(['message'=>'invalid login details'], 401);
        }

        $user = Auth::User();
        return response()->json(['message'=>'login successful', 'user' =>$user], 200); 
    }

   
}
