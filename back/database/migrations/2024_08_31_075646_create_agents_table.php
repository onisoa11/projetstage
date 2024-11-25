<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->increments('id');
            $table->string('im');
            $table->string('nom');
            $table->string('cin');
            $table->date('dateNaisse');
            $table->string('localite');
            $table->string('situation');
            $table->string('categoriePension');
            $table->date('dateEntreeAdmin');
            $table->date('dateRetraite');
            $table->decimal('AnnuiteService',10,2)->nullable(); 
            $table->date('dateJuissance');
            $table->decimal('pla', 15, 2)->nullable();
            $table->decimal('total', 15, 2)->nullable();
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
        Schema::dropIfExists('agents');
    }
}
