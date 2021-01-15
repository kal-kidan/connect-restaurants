<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class menu extends Model
{
    protected $fillable = [
        'vendorid','name', 'price','category','detail', 'created_at', 'updated_at'
    ];
    public function carts() {
        return $this->hasMany('App\Cart');
    }
}
