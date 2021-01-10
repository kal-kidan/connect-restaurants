<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'vendor_id', 'user_id','total','order_delivered','order_type','latitude', 'logitude','sub_total','payment_type' ,'status','note'
    ];
}
