<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agent;
use App\Models\Veuve;
use App\Models\Orphelinat;

class DashController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    public function statsParMois(Request $request)
    {
        $category = $request->input('category', 'agents'); // 'agents' par défaut

        switch ($category) {
            case 'agents':
                $data = Agent::selectRaw('MONTH(created_at) as mois, COUNT(*) as nombre')
                    ->groupBy('mois')
                    ->orderBy('mois')
                    ->get();
                break;
            case 'veuves':
                $data = Veuve::selectRaw('MONTH(created_at) as mois, COUNT(*) as nombre')
                    ->groupBy('mois')
                    ->orderBy('mois')
                    ->get();
                break;
            case 'orphelinats':
                $data = Orphelinat::selectRaw('MONTH(created_at) as mois, COUNT(*) as nombre')
                    ->groupBy('mois')
                    ->orderBy('mois')
                    ->get();
                break;
            default:
                return response()->json(['error' => 'Catégorie non valide'], 400);
        }

        // Formatter les mois pour les afficher correctement
        $data = $data->map(function($item) {
            $mois = [
                1 => 'Janvier', 2 => 'Février', 3 => 'Mars', 4 => 'Avril',
                5 => 'Mai', 6 => 'Juin', 7 => 'Juillet', 8 => 'Août',
                9 => 'Septembre', 10 => 'Octobre', 11 => 'Novembre', 12 => 'Décembre'
            ];
            return [
                'mois' => $mois[$item->mois] ?? 'Inconnu', // Gère les mois inconnus
                'nombre' => $item->nombre
            ];
        });

        return response()->json($data);
    }
    
    public function getMonthlyStats()
    {
        $months = range(1, 12); // Mois de 1 à 12

        $agents = array_map(function ($month) {
            return [
                'mois' => $month,
                'nombre' => Agent::whereMonth('created_at', $month)->count()
            ];
        }, $months);

        $veuves = array_map(function ($month) {
            return [
                'mois' => $month,
                'nombre' => Veuve::whereMonth('created_at', $month)->count()
            ];
        }, $months);

        $orphelinats = array_map(function ($month) {
            return [
                'mois' => $month,
                'nombre' => Orphelinat::whereMonth('created_at', $month)->count()
            ];
        }, $months);

        return response()->json([
            'agents' => $agents,
            'veuves' => $veuves,
            'orphelinats' => $orphelinats,
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
