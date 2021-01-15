<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
class AccountManagementController extends Controller
{
   public function updateUserData(Request $request, $user_id){
      try {
        $user = User::find($user_id);
        $user[$request->name] = $request->value;
        $user->save();
        return response()->json(["status"=>true, "message"=>"you have sucessfuly updated $request->name"]);
      } catch (Exception $e) {
         return response()->json(["status"=>false, "error"=>true, "message"=>$e->getMessage()], 500);
      }
   }
}
