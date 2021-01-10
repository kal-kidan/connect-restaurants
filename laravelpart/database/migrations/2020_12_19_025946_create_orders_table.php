<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('vendor_id');
            $table->integer('user_id');
            $table->integer('total');
            $table->integer('order_delivered')->default(0);
            $table->string('order_type');
            $table->integer('latitude')->nullable();
            $table->integer('logitude')->nullable();
            $table->integer('sub_total');//without taxes, discount, shipping, etc.
            $table->integer('payment_type')->nullable();
            $table->integer('status')->nullable();//paid, checkout, canceled, failed, expired
            $table->text('note')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
