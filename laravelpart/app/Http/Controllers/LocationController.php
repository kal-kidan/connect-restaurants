<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GeoLocation;
use App\User;
use Illuminate\Support\Facades\DB;
class LocationController extends Controller
{
    public function addLocation(Request $request){ 
        $request->validate([
            'user_id'=>'required|numeric', 
            'user_type'=>'string|max:2000',
            'address_line1'=>'string|max:2000',
            'address_line2'=>'string|max:2000',
            'country'=>'string|max:2000',
            'formatted'=>'string|max:2000',
            'city'=>'string|max:2000',
            'state'=>'string|max:2000',
            'country_code'=>'string|max:2000',
            'postalCode'=>'string|max:2000',
            'category'=>'string|max:2000',
            'latitude'=>'required|numeric',
            'longitude'=>'required|numeric' 
        ]) ;
        $location = GeoLocation::where('user_id',$request->user_id)->first();
      try {
        if(!$location){
            GeoLocation::create($request->all());
        }
        else{
          $columns =[ 'address_line1','address_line2','country','formatted','city','state','country_code','latitude','longitude', 'street', 'county'];
            $id = $location->id;
            $location = GeoLocation::find($id);
            foreach ($columns as $key ) {
                $location[$key] = $request[$key];
            }
            $location->save();
        }
        return response()->json(["success"=>true, "message"=>"you have updated your location successfully"], 200); 
      } catch (Excepton $e) {
        return response()->json(["error"=>true, "message"=>"please enter valid data"], 400); 
      }
    }

   public function getNearestLocation($lat, $lon){ 
    $users = DB::table("geo_locations")
            ->join('users', 'users.id', '=', 'geo_locations.user_id')
            ->select(["geo_locations.*", "users.cafename", "users.address", "users.phonenumber",
             "users.coverimage", "users.aboutus", "users.status"
            ,DB::raw("(6371 * acos(cos(radians(" . $lat . ")) 
            * cos(radians(geo_locations.latitude)) 
            * cos(radians(geo_locations.longitude) - radians(" . $lon . ")) 
            + sin(radians(" .$lat. ")) 
            * sin(radians(geo_locations.latitude)))) as distance")])
            ->havingRaw('distance < ?', [100])
            ->orderByRaw('distance')
            ->get() ; 
            return response()->json($users);
    }
}
