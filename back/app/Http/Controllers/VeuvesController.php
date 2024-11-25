<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Orphelinat;
use App\Models\Veuve;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class VeuvesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Veuve::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function getTotalPensions()
    {
        // Jointure entre les tables veuve, agent, et orphelinat pour calculer les pensions
        $totalPensionVeuves = Veuve::count(); // Somme des pensions des veuves
        $totalPensionAgents = Agent::count(); // Somme des pensions des agents
        $totalPensionOrphelins = Orphelinat::count(); // Somme des pensions des orphelins

        // Calcul du total des pensions
        $totalPensions = $totalPensionVeuves + $totalPensionAgents + $totalPensionOrphelins;

        // Retourner les données sous forme de JSON
        return response()->json([
            'totalPensions' => $totalPensions
        ]);
    }


    public function getTotalVeuves()
    {
        $totalVeuves = Veuve::count(); // Compte le nombre total de veuves
        return response()->json(['totalVeuves' => $totalVeuves]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input,[
            'reference' => 'required',
            'im' => 'required',
            'nom' => 'required',
            'cin' => 'required',
            'situation'  => 'required',
            'dateNaisse' => 'required |date',
            'dateEntreAdmin' => 'required ',
            'dateRetraite' => 'required ',
            'dateMariage' => 'required ',
            'dateDece' => 'required ',
            'dureeMariage' => 'required',
            'nomV' => 'required',
            'cinV' => 'required',
            'dateNaisseV' => 'required |date',
            'dateJuissanceV' => 'required',
            'An' => 'nullable | numeric',
            'plA' => 'nullable | numeric',
            'plV' => 'nullable | numeric',
            'totalD' => 'nullable | numeric'
            
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error', $validator->errors());
        }
        $veuve = Veuve::create($input);
        return response()->json([
            'success'=>true,
            'message' => 'veuve Record Created Successfully',
            'Veuve'=> $veuve
        ]);
         
    }

    public function search(Request $request)
{
    $query = $request->input('query');

    // Recherche par IM, nom, localité, CIN, situation ou date de naissance
    $results = Veuve::where('im', 'like', "%{$query}%")
        ->orWhere('nomV', 'like', "%{$query}%")
        ->orWhere('localite', 'like', "%{$query}%")
        ->orWhere('cinV', 'like', "%{$query}%")
        ->orWhere('situation', 'like', "%{$query}%")
        ->orWhere('dateNaisseV', 'like', "%{$query}%")
        ->get(['im', 'nom', 'localite', 'cin', 'situation', 'dateNaisse']); // Sélectionner les colonnes nécessaires

    // Retourner les résultats sous forme de JSON
    return response()->json($results);
}


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Récupérer l'agent par son ID
        $veuve = Veuve::find($id);

        // Si l've$veuve n'existe pas, renvoyer une réponse 404
        if (!$veuve) {
            return response()->json(['message' => 'Veuve not found'], 404);
        }

        // Retourner les détails de l've$veuve sous forme de JSON
        return response()->json($veuve);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(Veuve::Where('id',$id)->exists()){
            $agent = Veuve::find($id);
            $agent->reference = $request->reference;
            $agent->im = $request->im;
            $agent->nom = $request->nom;
            $agent->cin = $request->cin;
            $agent->situation = $request->situation;
            $agent->dateNaisse = $request->dateNaisse;
            $agent->dateEntreAdmin = $request->dateEntreAdmin;
            $agent->dateRetraite = $request->dateRetraite;
            $agent->dateMariage = $request->dateMariage;
            $agent->dateDece = $request->dateDece;
            $agent->dureeMariage = $request->dureeMariage;
            $agent->nomV = $request->nomV;
            $agent->cinV = $request->cinV;
            $agent->dateNaisseV = $request->dateNaisseV;
            $agent->dateJuissanceV = $request->dateJuissanceV;
            $agent->An = $request->An;
            $agent->plA = $request->plA;
            $agent->plV = $request->plV;
            $agent->totalD = $request->totalD;
            $agent->save();
            return response()->json([
                'message'=>'Veuve Record Update Successfully'
            ],200);
        }
        else{
            return response()->json([
                'message'=>'veuve not Found'
            ],404);
        }
    }

    public function getMonthlyData()
{
    // Assurez-vous que 'dateRetraite' est une colonne date dans votre base de données
    $data = Veuve::selectRaw('MONTH(dateRetraite) as month, COUNT(*) as count')
                 ->groupBy('month')
                 ->get();

    return response()->json($data);
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Veuve::find($id);

        if ($item) {
            $item->delete();
            return response()->json(['message' => 'Item deleted successfully.'], 200);
        } else {
            return response()->json(['message' => 'Item not found.'], 404);
        }
    }
}
