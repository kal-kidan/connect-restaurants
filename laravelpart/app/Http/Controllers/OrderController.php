<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Order;
use App\Cart;
use App\OrderItem;
use App\Credit;
class OrderController extends Controller
{
    public function placeOrder(Request $request){
        $orderValidator = Validator::make($request->order, [
            'vendor_id'=>'numeric|required|exists:users,id',
            'user_id'=>'numeric|required|exists:users,id',
            'latitude'=>'numeric',
            'logitude'=>'numeric',
            'order_delivered'=>'numeric',
            'order_type '=>'string|max:200',
            'total'=>'numeric|gt:0',
            'sub_total'=>'numeric|gt:0',
            'status '=>'string|max:200',
            'payment_type '=>'string|max:200',
            'note '=>'string|max:2000' 
         ]);
         if ($orderValidator->fails()) {
            return response()->json($orderValidator);
        }
        
       foreach($request->orderItems as $orderItem){
        $validator = Validator::make($orderItem, [
            'menu_id'=>'numeric|required|exists:menus,id',
            'user_id'=>'numeric|required|exists:users,id',
            'price'=>'numeric|required|gt:0',
            'name'=>'string|required',
            'quantity'=>'numeric|required|gt:0' 
         ]); 
         if ($validator->fails()) {
            return response()->json($validator);
        }
       }
        try { 
        $balance =  Credit::where('user_id', $request->order['user_id'])->first();
        if(!$balance){
            return response()->json(["error"=>"true", "message"=>"You haven't added any balance yet, please contact adminstrators to add your credit."], 400);
        }
        else if($balance->amount<$request->order['total']){
            return response()->json(["error"=>"true", "message"=>"You don't have enough balance, please contact adminstrators to add your credit."], 400);
        }
         $deletedRow = Cart::where('user_id', '=', $request->order['user_id'])->delete(); 
         $order = Order::create($request->order);  
        if($order){
            $orderItems = [];
            for ($i=0; $i < count($request->orderItems); $i++) { 
                OrderItem::create(["order_id"=>$order['id'], "menu_id"=>$request->orderItems[$i]['menu_id'], "price"=>$request->orderItems[$i]['price'], "name"=>$request->orderItems[$i]['name'], "quantity"=>$request->orderItems[$i]['quantity']]);
            }  
            Credit::find($balance->id)->update(['amount' => $balance->amount-$request->order['total']]);
            return response()->json(["status"=>true, "message"=>"order placed successfully", "order"=>$order]);
        }
        else{
           return response()->json(["error" => "couldn't place order", "status"=>false], 400);
        }
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage(), "status"=>false], 500);
        }
    }

    public function getVendorOrders($vendor_id){ 
        $orders = Order::where('vendor_id', $vendor_id)
        ->join('users', 'users.id', '=', 'orders.user_id')
        ->select('orders.*', 'users.firstName', 'users.lastName', 'users.address', 'users.phoneNumber', 'users.email')
        ->orderBy('created_at', 'desc')
        ->get();
        return response()->json($orders);
    }
    public function getOrderItems($orderId){ 
         $orderItems = OrderItem::where('order_id', $orderId)->get();
         return response()->json($orderItems);
     }

     public function updateSeen($id){ 
        $order = Order::find($id);
        $order->seen = 1;
        $order->save();
        return response()->json(["status"=>true]);
    }

    public function getNumberOfOrders($vendor_id){
        $orders = Order::where('vendor_id', $vendor_id)
                    ->where('seen', 0)
                    ->get();
        $orderNumber = $orders->count();
        return response()->json($orderNumber);        
    }

    public function markAsServed($order_id){
       try {
        $orders = Order::where('id', $order_id)
        ->update(['order_delivered' => 1]); 
         return response()->json(["status"=>true, "message"=>"order marked as served"]);  
       } catch (Exception $e) {
        return response()->json(["status"=>false, $e->getMessage()], 500);  
       }      
    }
    
}


class OrderItems{ 
    public $menu_id;
    public $user_id;
    public $price;
    public $name;
    public $quantity;
    public $order_id;
    public function __construct($menu_id, $user_id, $price, $name, $quantity, $order_id) {
        $this->menu_id = $menu_id;
        $this->user_id = $user_id;
        $this->price = $price;
        $this->name = $name;
        $this->quantity = $name; 
        $this->order_id = $order_id;
    }
  
}