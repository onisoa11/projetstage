<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Agent;
use Illuminate\Http\Request;

class AgentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Agent::all();
    }

    public function getAgentByIm($id)
    {
        // Rechercher l'agent par IM
        $agent = Agent::where('im', $id)->first();

        if ($agent) {
            return response()->json($agent);
        } else {
            return response()->json(['message' => 'Agent not found'], 404);
        }
    }


    public function getMonthlyData()
    {
        $data = Agent::selectRaw('MONTH(dateRetraite) as month, COUNT(*) as count')
                    ->groupBy('month')
                    ->get()
                    ->map(function ($item) {
                        return [
                            'month' => $item->month,
                            'count' => $item->count,
                        ];
                    });
    
        return response()->json($data);
    }
    
    public function getTotalorphelinat()
    {
        $totalAgen = Agent::count(); // Compte le nombre total de veuves
        return response()->json(['totalAgen' => $totalAgen]);
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
            'im' => 'required',
            'nom' => 'required',
            'cin' => 'required',
            'dateNaisse' => 'required|date',
            'localite' => 'required',
            'situation' => 'required',
            'categoriePension' => 'required',
            'dateEntreeAdmin' => 'required|date',
            'dateRetraite' => 'required|date',
            'AnnuiteService' => 'nullable|numeric',
            'dateJuissance' => 'required|date',
            'pla' => 'nullable|numeric',
            'total' => 'nullable|numeric'
            
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error', $validator->errors());
        }
        $agent = Agent::create($input);
        return response()->json([
            'success'=>true,
            'message' => 'Agent Record Created Successfully',
            'Agent'=> $agent
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
        $agent = Agent::find($id);

        // Si l'agent n'existe pas, renvoyer une réponse 404
        if (!$agent) {
            return response()->json(['message' => 'Agent not found'], 404);
        }

        // Retourner les détails de l'agent sous forme de JSON
        return response()->json($agent);
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
        if(Agent::Where('id',$id)->exists()){
            $agent = Agent::find($id);
            $agent->im = $request->im;
            $agent->nom = $request->nom;
            $agent->cin = $request->cin;
            $agent->dateNaisse = $request->dateNaisse;
            $agent->localite = $request->localite;
            $agent->situation = $request->situation;
            $agent->categoriePension = $request->categoriePension;
            $agent->dateEntreeAdmin = $request->dateEntreeAdmin;
            $agent->dateRetraite = $request->dateRetraite;
            $agent->AnnuiteService = $request->AnnuiteService;
            $agent->dateJuissance = $request->dateJuissance;
            $agent->pla = $request->pla;
            $agent->total = $request->total;
            $agent->save();
            return response()->json([
                'message'=>'Agent Record Update Successfully'
            ],200);
        }
        else{
            return response()->json([
                'message'=>'agent not Found'
            ],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Agent::find($id);

        if ($item) {
            $item->delete();
            return response()->json(['message' => 'Item deleted successfully.'], 200);
        } else {
            return response()->json(['message' => 'Item not found.'], 404);
        }
    
    }
}
