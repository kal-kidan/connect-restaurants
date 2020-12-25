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
            $table->string('street');
            $table->string('country');
            $table->string('full_format');
            $table->string('region')->nullable();
            $table->string('regionName')->nullable();
            $table->string('countryCode')->nullable();
            $table->string('isp')->nullable();
            $table->string('postalCode')->nullable();
            $table->string('timezone')->nullable();
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
