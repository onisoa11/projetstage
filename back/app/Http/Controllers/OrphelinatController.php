<?php

namespace App\Http\Controllers;

use App\Models\Orphelinat;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class OrphelinatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Orphelinat::all();
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

    public function getTotalorphelinat()
    {
        $totalorphelin = Orphelinat::count(); // Compte le nombre total de veuves
        return response()->json(['totalorphelin' => $totalorphelin]);
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
            'referenceO' => 'required',
            'im' => 'required',
            'nom' => 'required',
            'dateNaisse' => 'required |date',
            'dateRetraite' => 'required |date',
            'dateEntreAdmin' => 'required |date',
            'dateDece' => 'required |date',
            'nomOrphelin' => 'required',
            'dateNaisseOrphelin' => 'required',
            'situation'  => 'required',
            'nomTuteur'  => 'required',
            'cinTuteur'  => 'required',
            'dateNaisseTuteur' => 'required |date',
            'categoriePension'  => 'required',
            'dateJuissance' => 'required',
            'AS' => 'nullable | numeric',
            'plAgent' => 'nullable | numeric',
            'plOrphelinat' => 'nullable | numeric',
            'totalDecompte' => 'nullable | numeric'
            
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error', $validator->errors());
        }
        $orphelinat = Orphelinat::create($input);
        return response()->json([
            'success'=>true,
            'message' => 'veuve Record Created Successfully',
            'Orphelinat'=> $orphelinat
        ]);
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
        $orphelinat = Orphelinat::find($id);

        // Si l'orphelinat n'existe pas, renvoyer une réponse 404
        if (!$orphelinat) {
            return response()->json(['message' => 'Orphelinat not found'], 404);
        }

        // Retourner les détails de l'orphelinat sous forme de JSON
        return response()->json($orphelinat);
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
        if(Orphelinat::Where('id',$id)->exists()){
            $orphelinat = Orphelinat::find($id);
            $orphelinat->referenceO = $request->referenceO;
            $orphelinat->im = $request->im;
            $orphelinat->nom = $request->nom;
            $orphelinat->dateNaisse = $request->dateNaisse;
            $orphelinat->dateRetraite = $request->dateRetraite;
            $orphelinat->dateEntreAdmin = $request->dateEntreAdmin;
            $orphelinat->dateDece = $request->dateDece;
            $orphelinat->nomOrphelin = $request->nomOrphelin;
            $orphelinat->dateNaisseOrphelin = $request->dateNaisseOrphelin;
            $orphelinat->situation = $request->situation;
            $orphelinat->dateDece = $request->dateDece;
            $orphelinat->nomTuteur = $request->nomTuteur;
            $orphelinat->cinTuteur = $request->cinTuteur;
            $orphelinat->dateNaisseTuteur = $request->dateNaisseTuteur;
            $orphelinat->categoriePension = $request->categoriePension;
            $orphelinat->dateJuissance = $request->dateJuissance;
            $orphelinat->AS = $request->AS;
            $orphelinat->plAgent = $request->plAgent;
            $orphelinat->plOrphelinat = $request->plOrphelinat;
            $orphelinat->totalDecompte = $request->totalDecompte;
            $orphelinat->save();
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
        $data = Orphelinat::selectRaw('MONTH(dateRetraite) as month, COUNT(*) as count')
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
        $item = Orphelinat::find($id);

        if ($item) {
            $item->delete();
            return response()->json(['message' => 'Item deleted successfully.'], 200);
        } else {
            return response()->json(['message' => 'Item not found.'], 404);
        } 
    }
}
