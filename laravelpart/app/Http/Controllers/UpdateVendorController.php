<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

class UpdateVendorController extends Controller
{
    public function updateCover(Request $request){
        // $this->validate(
        //     $request,
        //     ['file'=>'required|image|max:2048']
        // );

         $user = User::find($request->id);
         $image=$request->file('file');
         $uploadedImage=time().$image->getClientOriginalName() ; 
         $image->move('uploads', $uploadedImage);
         $path = "uploads/".$uploadedImage;
         $user->coverimage="uploads/".$uploadedImage;
         $saved=$user->save();
         return response()->json("$path");

    }

}
