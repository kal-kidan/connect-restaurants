<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Credit;
class CreditController extends Controller
{
    public function addAmount(Request $request){
        $this->validate($request, [
            'user_id'=>'integer|required',
            'amount'=>'numeric|required'
        ]);
       try {
        $credit = Credit::where('user_id', $request->user_id)->first();
        if($credit){
            $credit->amount = $credit->amount + $request->amount;
            $credit->save();
        }
        else{
            Credit::create($request->all());
        }
        return response()->json(["status"=>true, "message"=>"you have successfuly added $request->amount amount of birr, you have now $credit->amount birr"]);
       } catch (Exception $e) {
           return response()->json(["error"=>true, "message"=>$e->getMessage()], 500);
       }
    }

    public function dropAmount(Request $request){
        $this->validate($request, [
            'user_id'=>'integer|required',
            'amount'=>'numeric|required'
        ]);
       try {
        $credit = Credit::where('user_id', $request->user_id)->first();
        if($credit){
            if($credit->amount<$request->amount){
                return response()->json(["error"=>true, "message"=>"your balance is $credit->amount, please enter less than this amount."], 400);
            }
            $credit->amount = $credit->amount - $request->amount;
            $credit->save();
            return response()->json(["status"=>true, "message"=>"you have successfuly droped $request->amount amount of birr, you have now $credit->amount birr"]);
        }
        else{
            return response()->json(["error"=>true, "message"=>"you don't have any balance."], 400);
        }
        
       } catch (Exception $e) {
           return response()->json(["error"=>true, "message"=>$e->getMessage()], 500);
       }
    }
}
