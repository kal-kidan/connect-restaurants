<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = ['user_id', 'vendor_id', 'created_at', 'updated_at', 'is_favorite'];
}
