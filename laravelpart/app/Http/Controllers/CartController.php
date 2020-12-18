<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cart;
use App\User;
use App\Menu;
use Illuminate\Support\Facades\Auth;
use Validator;

class CartController extends Controller
{
    public function add(Request $request){
      $request->validate([
            'user_id'=>'required|numeric',
            'menu_id'=>'required|numeric',
            'vendor_id'=>'required|numeric'
        ]) ;
       $vendor = User::find($request->vendor_id);
       $cart = Cart::where('menu_id', $request->menu_id)->where('user_id', $request->user_id)->first();
       if(Auth::id()!==$request->user_id){
         return response()->json(["error"=>true, "message"=>"you are not authorized"], 401);
       }
      else if (empty($vendor)){
         return response()->json(["error"=>true, "message"=>"vendor not found"], 404);
     }
     else if($cart){
        return response()->json(["error"=>true, "message"=>"the menu is already added"], 400);
     }

       try {
        $cart = Cart::create($request->all());
         return response()->json(["status"=>true, "message"=>"cart created", "cart"=>$cart]);
       } catch (Exception $e) {
        response()->json(["error"=>true, "message"=>$e->getMessage()], 400);
       }


    }

    public function getCarts($id){
        $carts = [];
        try {
            $fetchedCarts = Cart::where('user_id',$id)->get();
            foreach ($fetchedCarts as $index=>$cart) {
                $menu_id = $cart->menu_id; 
                $vendor_id = $cart->vendor_id; 
                $id = $cart->id; 
                $menu =  Menu::find($menu_id);
                $name = $menu->name;
                $price = $menu->price;
                $quantity = $cart->quantity;
                $returnedCart= new ReturnedCart($id,$vendor_id,$menu_id,$name, $price,$quantity);
                $carts[$index] = $returnedCart;
            }
            return response()->json(["status"=>true, "carts"=>$carts]);
        } catch (Exception $e) {
            return response()->json(["error"=>true, "message"=>$e->getMessage()]);
        }
        
    }

    public function updateQuantity($id){    
        try {
            $cart = Cart::find($id);
            if(empty($cart)){
                return response()->json(["error"=>true, "message "=>"id $id not found"], 404);
            }
            $cart->save();
            return response()->json(["status"=>true, "message "=>"quantity updated successfuly"]);
        } catch (Exception $e) {
            return response()->json(["error"=>true, "message"=>$e->getMessage()]);
        }
    }

    public function delete($id){
        try {
            $deletedCart = Cart::where('id',$id)->delete();
            if($deletedCart>0){
                return response()->json(["status"=>true, "message"=>"cart deleted"]);
            }
            else{
                return response()->json(["error"=>true, "message"=>"cart id $id not found"], 404);
            }
             
            
           } catch (Exception $e) {
            response()->json(["error"=>true, "message"=>$e->getMessage()], 400);
           }

    }
    public function getTotalPrice($userId){
        try {
            $carts = User::find($userId)->cart();
            $total=0;
            foreach ($carts as $cart) {
                $menu = $cart->menu();
                $quantity = $cart->quantity;
                $singlePrice = $menu->price * $quantity;
                $total+=$singlePrice;
            }
            return response()->json(["status"=>true, "totalPrice"=>$total]);
           } catch (Exception $e) {
            response()->json(["error"=>true, "message"=>$e->getMessage()], 400);
           }

    }
}

class ReturnedCart {
   public function __construct($id, $vendorId, $menu_id, $name, $price, $quantity){
    $this->id = $id;
    $this->vendorId = $vendorId;
    $this->name = $name;
    $this->price = $price;
    $this->quantity = $quantity; 
    $this->menu_id = $menu_id; 
   }
    public $id;
    public $menu_id;
    public $vendorId;
    public $name;
    public $price;
    public $quantity;
}