<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeoLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('geo_locations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id');
            $table->integer('user_type');
            $table->string('address_line1');
            $table->string('address_line2');
            $table->string('country');
            $table->string('formatted');
            $table->string('city');
            $table->string('state');
            $table->string('street');
            $table->string('country_code');
            $table->string('postalCode'); 
            $table->integer('latitude');
            $table->integer('longitude');
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
        Schema::dropIfExists('geo_locations');
    }
}
