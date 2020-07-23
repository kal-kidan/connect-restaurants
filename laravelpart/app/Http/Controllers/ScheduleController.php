<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Schedule;
use App\User;
class ScheduleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
 
    function addSchedule(Request $request){ 
       $this->validate($request,
       [
          'vendor_id'=>'numeric', 
          'timespan'=>'string|max:200',
        
       ]);
       $schedule = Schedule::create($request->all());
       if($schedule){
          return response()->json($schedule);
       }
       else{
          return response()->json(["error" => "can not add schedule"], 401);
       }
    }
 
    function deletedSchedule(Request $request){
       $id=$request->id;
       $destroyedSchedule=Schedule::destroy($id);
       if($destroyedSchedule){
        return response()->json($destroyedSchedule);
       }
       else{
        return response()->json(["error"=>"can not delete the schedule",401]);
       }
      
    }
 
    function updateSchedule(){
 
    }
 
    function getSchedules(Request $request){
       $id=$request->id;
       $schedules=Schedule::where('vendor_id', $id)->get();
 
       if($schedules){
          return response()->json($schedules);
       }
       else{
          return response()->json(["error"=>"can not fetch schedules"],404);
       }
    }

    function updateStatus(Request $request){
        $this->validate($request,
       [
          'id'=>'numeric', 
          'status'=>'string|max:200',
        
       ]);
            $id=$request->id;
            $user=User::find($id);
            if($user){
                $user->status=$request->status;
                $user->save();
                return response()->json($user);
            }
            else{
                return response()->json(["error"=>"can not update status"],404);
            }
           
    }
}
