<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;

class OrderController extends Controller
{
    public function placeOrder(Request $request){
        $this->validate($request,
        [
           'vendor_id'=>'numeric|required|exists:user',
           'user_id'=>'numeric|required|exists:user',
           'total'=>'numeric|max:200|gt:0',
           'sub_total'=>'numeric|max:200|gt:0',
           'status '=>'string|max:200' 
        ]);
        try {
         $order = Order::create($request->all());
        if($order){
           return response()->json(["status"=>true, "message"=>"order placed successfully", "order"=>$order]);
        }
        else{
           return response()->json(["error" => "couldn't place order", "status"=>false], 400);
        }
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage(), "status"=>false], 500);
        }
    }
}
