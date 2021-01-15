<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Favorite;
class FavoriteController extends Controller
{
    public function toggelFavorite(Request $request){
       try{
        $this->validate($request, [
            'user_id'=>'required|integer',
            'vendor_id'=>'required|integer'
        ]);
        $favorite = Favorite::where('user_id', $request->user_id)->where('vendor_id', $request->vendor_id)->first();
        if(!$favorite){
            Favorite::create($request->all());
            return response()->json(["status"=>true, "message"=>"you have successfully added to favorite"]);
        }
        else{
            Favorite::where('user_id', $request->user_id)->where('vendor_id', $request->vendor_id)->delete();
            return response()->json(["status"=>true, "message"=>"you have successfully removed from favorite"]);
        }
        
       }catch(Exception $e){
            return response()->json(["error"=>true, "message"=>$e->getMessage()]);
       }
    }
}
