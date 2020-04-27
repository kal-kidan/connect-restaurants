<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group([

    'middleware' => ['api'] 

], function ($router) {

    Route::post('login', 'AuthController@login')->name('login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me'); 
    Route::get('user', 'AuthController@user'); 
    Route::post('vendor/signup', 'VendorAuthController@signup');
    Route::post('vendor/login', 'VendorAuthController@login');
    Route::post('vendor/logout', 'VendorAuthController@logout');
    Route::post('vendor/register', 'RegisterVendorController@register');
    Route::post('vendor/updatecover', 'UpdateVendorController@updateCover');

});
