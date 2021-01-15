<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;
class SearchController extends Controller
{
    public function searchRestaurants($search_item){
        $users = DB::table("users") 
        ->join('menus', 'users.id', '=', 'menus.vendorid')
        ->join('geo_locations', 'geo_locations.user_id', '=', 'menus.vendorid')
        ->select(["menus.*", "geo_locations.*", "users.cafename", "users.address", "users.phonenumber",
         "users.coverimage", "users.aboutus", "users.status", "users.id"
         ])
        ->where('cafename', 'like', "%$search_item%")
        ->orWhere('formatted', 'like', "%$search_item%")
        ->orWhere('address', 'like', "%$search_item%")
        ->orWhere('name', 'like', "%$search_item%")
        ->orWhere('price', 'like', "%$search_item%")
        ->get(); 
         $result = $this->unique_multidim_array($users);
         return response()->json($result);
    }

    function unique_multidim_array($array) { 
        $i = 0;
        $key_array = [];
        foreach($array as $val) {
            if (!$this->inArray($key_array, $val)) {
                $key_array[$i] = $val; 
            }
            $i++;
        }
        return $key_array;
    }

    function inArray($array, $passedValue){
        foreach ($array as $val) {
             if($val->id == $passedValue->id){
                return true;
             }
        }
        return false;
    }
    
}
