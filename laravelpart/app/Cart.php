<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use SoftDeletes;
class Cart extends Model
{
    protected $fillable = ['menu_id','user_id', 'vendor_id', 'quantity'];
    protected $dates = ['deleted_at'];
    public function user() {
        return $this->belongsTo('App\User');
    }
     
}

