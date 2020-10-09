<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Schedule;
use App\Menu;
class VendorController extends Controller

{
    public function getAllInfo($id){

        $user = User::find($id, ['address','cafename', 'coverimage','aboutus','status']);
        $schedules = Schedule::where('vendor_id', $id)->get();
        $menus = Menu::where('vendorid', $id)->get();
        $vendor = new Vendor($user, $schedules, $menus);
        return response()->json($vendor);

    }
}

class Vendor{
    public $user;
    public $schedules;
    public $menus;
    public function __construct($user,$schedules,$menus ){
        $this->user = $user;
        $this->schedules = $schedules;
        $this->menus = $menus;
    }

}
