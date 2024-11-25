<?php

use App\Models\Validations;
use App\Http\Controllers\ValidationController;
use App\Http\Resources\ValidationResource;

use App\Models\Compte;
use App\Http\Controllers\CompteAuthController;
use App\Http\Resources\CompteAuthResource;

//UserResource
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\AuthController;
use App\Http\Resources\UserResource;

use App\Http\Controllers\DashController;
use App\Http\Controllers\SMSController;

use App\Models\Agent;
use App\Http\Controllers\AgentsController;
use App\Http\Resources\AgentsResource;


use App\Models\agen;
use App\Http\Controllers\AgenController;
use App\Http\Resources\AgenResource;

use App\Models\Orphelinat;
use App\Http\Controllers\OrphelinatController;
use App\Http\Resources\OrphelinatResource;

use App\Models\Veuve;
use App\Http\Resources\VeuvesResource;
use App\Http\Controllers\VeuvesController; 


use Illuminate\Http\Request;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Route;

use App\Models\student;
use App\Http\Resources\StudetsResource;
use App\Http\Controllers\StudentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



//api orphelinat
Route::get('/orphelins', function(){
    return OrphelinatResource::collection(Orphelinat::all());
});

Route::get('/orphelin/{id}', function(){
    return new OrphelinatResource(Orphelinat::findOrFail($id));
});

Route::put('/orphelin/{id}', [OrphelinatController::class, 'update']);

Route::post('/orphelin', [OrphelinatController::class, 'store']);

Route::get('/orphelin', [OrphelinatController::class, 'index']);

Route::delete('/orphelin/{id}', [OrphelinatController::class, 'destroy']);

Route::get('/orphelin/{id}', [OrphelinatController::class, 'show']);

Route::get('/orphelins/total', [OrphelinatController::class, 'getTotalorphelinat']);

//route pour veuve
Route::get('/veuves', function(){
    return VeuvesResource::collection(Veuve::all());
});
Route::get('/veuve/{id}', function(){
    return new VeuvesResource(Veuve::findOrFail($id));
});

Route::get('/veuves/search', [VeuvesController::class, 'search']);

Route::delete('/veuve/{id}', [VeuvesController::class, 'destroy']);

Route::post('/veuve', [VeuvesController::class, 'store']);

Route::get('/veuve', [VeuvesController::class, 'index']);

Route::put('/veuve/{id}', [VeuvesController::class, 'update']);

Route::get('/veuve/{id}', [VeuvesController::class, 'show']);

Route::get('/veuves/total', [VeuvesController::class, 'getTotalVeuves']);
Route::get('/veuves/totals', [VeuvesController::class, 'getTotalPensions']);

//route pour agent
Route::get('/agents', function(){
    return AgentsResource::collection(Agent::all());
});

Route::get('/agent/{id}', function(){
    return new AgentsResource(Agent::findOrFail($id));
});

//Route::get('/agent/{id}', [AgentsController::class, 'getAgentByIm']);

Route::get('/agen/total', [AgentsController::class, 'getTotalorphelinat']);

Route::put('/agent/{id}', [AgentsController::class, 'update']);

Route::post('/agentss', [AgentsController::class, 'store']);

Route::get('/agent', [AgentsController::class, 'index']);

Route::delete('/agent/{id}', [AgentsController::class, 'destroy']);

Route::get('/agents/{id}', [AgentsController::class, 'show']);

Route::get('/stats-par-mois', [DashController::class, 'statsParMois']);

// api.php
Route::get('/stats-mois', [DashController::class, 'getMonthlyStats']);


//login
Route::get('/register', function(){
    return UserResource::collection(User::all());
});
Route::get('/register/{id}', function(){
    return new UserResource(Veuve::findOrFail($id));
});
Route::post('/registers', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request){
    return $request->user();
});
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

//route pour agen
Route::get('/agens', function(){
    return AgenResource::collection(agen::all());
});

Route::get('/agens/{im}', function($im){
    return new AgenResource(agen::findOrFail($im));
});
Route::post('/agen', [AgenController::class, 'store']);

//sms
Route::post('/send-sms', [SMSController::class, 'send']);

//validation

Route::get('/validatons', function(){
    return ValidationResource::collection(Validations::all());
});

Route::get('/validatons/{im}', function($im){
    return new ValidationResource(Validations::findOrFail($im));
});
Route::post('/validationt', [ValidationController::class, 'store']);

Route::get('/validation/{im}', [ValidationController::class, 'show']);

Route::get('/validations', [ValidationController::class, 'index']);

Route::delete('/validation/{im}', [ValidationController::class, 'destroy']);

Route::get('/compte', function(){
    return CompteAuthResource::collection(Compte::all());
});

Route::get('/compte/{IM}', function($IM){
    return new CompteAuthResource(Compte::findOrFail($IM));
});

Route::post('/register', [CompteAuthController::class, 'register']);
Route::post('/login', [CompteAuthController::class, 'login']);
Route::post('/logout', [CompteAuthController::class, 'logout'])->middleware('auth:api');

// Routes protégées par JWT
Route::middleware(['auth:api'])->group(function () {
    Route::get('/profile', [CompteAuthController::class, 'profile']);
    Route::post('/logout', [CompteAuthController::class, 'logout']);
});



