<?php

namespace App\Http\Controllers;

use App\Menu;
use App\User;
use Illuminate\Http\Request;

class MenuController extends Controller
{
   public function __construct()
   {
       $this->middleware('auth:api');
   }

   function addMenu(Request $request){ 
      $this->validate($request,
      [
         'vendorid'=>'numeric',
         'name'=>'string|max:200',
         'price'=>'numeric|max:200|gt:0',
         'category'=>'string|max:200',
         'detail'=>'max:255' 
      ]);
      $menu = Menu::create($request->all());
      if($menu){
         return response()->json($menu);
      }
      else{
         return response()->json(["error" => "couldn't add menu"], 400);
      }
   }

   function deleteMenu(Request $request){
      $id=$request->id;
      $destroyedMenu=Menu::destroy($id);
      if($destroyedMenu){
         return response()->json($destroyedMenu);
        }
        else{
         return response()->json(["error"=>"can not delete the menu",400]);
        }
      
   }

   function updateMenu(){

   }

   function getMenu(Request $request){
      $id=$request->id;
      $menus=Menu::where('vendorid', $id)->get();

      if($menus){
         return response()->json($menus);
      }
      else{
         return response()->json(["error"=>"can not fetch menus"],404);
      }
   }
}
