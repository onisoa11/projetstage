<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Validations;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ValidationController extends Controller
{

    public function index()
    {
        return Validations::all();
    }

 





    public function store(Request $request)
    {
        $request->validate([
            'im' => 'required|string|max:6|unique:validations,im',
            'nom' => 'required|string|max:255',
            'date_entree_admin' => 'required|date|before:date_retraite',
            'date_retraite' => 'required|date',
            'file_path' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validations pour le fichier
        ]);

        // Stocker le fichier et obtenir le chemin
        if ($request->hasFile('file_path')) {
            $filePath = $request->file('file_path')->store('validations', 'public');  // Stocker dans le répertoire 'storage/app/public/validations'
        }

        // Créer la validation
        $validation = Validations::create([
            'im' => $request->im,
            'nom' => $request->nom,
            'date_entree_admin' => $request->date_entree_admin,
            'date_retraite' => $request->date_retraite,
            'file_path' => $filePath,
        ]);

        return response()->json($validation, 201);
    }


    public function show($id)
    {
        // Récupérer l'agent par son ID
        $agent = Validations::find($id);

        // Si l'agent n'existe pas, renvoyer une réponse 404
        if (!$agent) {
            return response()->json(['message' => 'Validations not found'], 404);
        }

        // Retourner les détails de l'agent sous forme de JSON
        return response()->json($agent);
    }
    

}
