<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Middleware\CORS;
use App\User;
class RegisterVendorController extends Controller
{

    public function __construct()
    {
        $this->middleware('api');
    }
    
   public function register(Request $request){
       $request->validate([
           'firstname' => 'required|regex:/^[a-zA-Z]*$/|max:30',
           'lastname' => 'required|regex:/^[a-zA-Z]*$/|max:30',
           'cafename' => 'required|string|max:30',
           'phonenumber' => 'required|regex:/^(\+2519)[0-9]{8}$/',
           'email' => 'required|email|unique:users|max:255',
           'idnumber' => 'required|string|max:30',
           'gender' => 'required|regex:/^[a-zA-Z]*$/|max:6',
       ]);

       $user = User::create($request->all());
       if($user){
        return response()->json(true);
       }
       else{
        return response()->json(false);
       } 
   }
}
