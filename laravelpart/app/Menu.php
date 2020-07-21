<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class menu extends Model
{
    protected $fillable = [
        'vendorid','name', 'price','category','detail' 
    ];
}
