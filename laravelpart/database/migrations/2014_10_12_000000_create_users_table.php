<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('firstname',30);
            $table->string('lastname',30);
            $table->string('gender',6);  
            $table->string('email')->unique();
            $table->string('phonenumber',15);
            $table->integer('address')->nullable();
            $table->string('idnumber', 30)->nullable();
            $table->string('cafename', 30)->nullable();
            $table->string('coverimage')->nullable(); 
            $table->text('aboutus')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();;
            $table->string('role');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
