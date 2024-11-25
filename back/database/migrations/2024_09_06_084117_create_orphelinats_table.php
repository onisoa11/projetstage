<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrphelinatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orphelinats', function (Blueprint $table) {
            $table->increments('id');
            $table->string('referenceO');
            $table->string('im');
            $table->string('nom');
            $table->date('dateNaisse');
            $table->date('dateRetraite');
            $table->date('dateEntreAdmin');
            $table->date('dateDece');
            $table->string('nomOrphelin');
            $table->string('dateNaisseOrphelin');
            $table->string('situation');
            $table->string('nomTuteur');
            $table->string('cinTuteur');
            $table->date('dateNaisseTuteur');
            $table->string('categoriePension');
            $table->string('dateJuissance');
            $table->decimal('AS', 15, 2)->nullable();
            $table->decimal('plAgent', 15, 2)->nullable();
            $table->decimal('plOrphelinat', 15, 2)->nullable();
            $table->decimal('totalDecompte', 15, 2)->nullable();

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
        Schema::dropIfExists('orphelinats');
    }
}
