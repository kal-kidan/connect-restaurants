<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GeoLocation extends Model
{
    protected $fillable = [
        'user_id','user_type', 'address_line1','address_line2','country','formatted','city','state','country_code','postalCode','latitude','longitude', 'street', 'county'
    ];
    public function users() {
        return $this->hasOne('App\User');
    }
}
