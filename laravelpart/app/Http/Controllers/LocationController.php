<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GeoLocation;
use App\User;
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
            $id = $location->id;
            $location = GeoLocation::find($id);
            foreach ($request->all() as $key => $value) {
                $location[$key] = $value;
            }
            $location->save();
        }
      } catch (Excepton $e) {
        return response()->json(["error"=>true, "message"=>"please enter valid data"], 400); 
      }
    }
}
