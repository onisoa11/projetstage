<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVeuvesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('veuves', function (Blueprint $table) {
            $table->increments('id');
            $table->string('reference');
            $table->string('im');
            $table->string('nom');
            $table->string('cin');
            $table->string('situation');
            $table->date('dateNaisse');
            $table->string('dateEntreAdmin');
            $table->string('dateRetraite');
            $table->string('dateMariage');
            $table->string('dateDece');
            $table->string('dureeMariage');
            $table->string('nomV');
            $table->string('cinV');
            $table->date('dateNaisseV');
            $table->string('dateJuissanceV');
            $table->decimal('An', 15, 2)->nullable();
            $table->decimal('plA', 15, 2)->nullable();
            $table->decimal('plV', 15, 2)->nullable();
            $table->decimal('totalD', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('veuves');
    }
}
