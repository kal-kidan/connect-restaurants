<?php

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

    'middleware' => ['api', 'CORS']

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
    Route::post('vendor/addmenu', 'MenuController@addMenu');
    Route::post('vendor/getmenu', 'MenuController@getMenu');
    Route::post('vendor/deletemenu', 'MenuController@deleteMenu');
    Route::post('vendor/addschedule', 'ScheduleController@addSchedule');
    Route::delete('vendor/deleteschedule', 'ScheduleController@deleteSchedule');
    Route::patch('vendor/updatestatus', 'ScheduleController@updateStatus');
    Route::patch('vendor/seen/{id}', 'OrderController@updateSeen');
    Route::patch('vendor/markasserve/{order_id}', 'OrderController@markAsServed');
    Route::get('vendor/countorders/{vendor_id}', 'OrderController@getNumberOfOrders');
    Route::get('vendor/query/{search_item}', 'SearchController@searchRestaurants');
    Route::get('vendor/order-history/{id}', 'OrderController@getVendorOrders');
    Route::get('order-item/{id}', 'OrderController@getOrderItems');
    Route::get('vendor/schedule', 'ScheduleController@getSchedules');
    Route::get('vendor/getstatus', 'ScheduleController@getStatus');
    Route::get('vendor/{id}', 'VendorController@getAllInfo');
    Route::put('user/location', 'LocationController@addLocation');
    Route::post('user/favorite', 'FavoriteController@toggelFavorite');
    Route::get('user/nearest-vendor/{latitude}/{logitude}', 'LocationController@getNearestLocation');
    Route::post('user/cart', 'CartController@add');
    Route::delete('user/cart/{id}', 'CartController@delete');
    Route::get('cart/user/{id}', 'CartController@getCarts');
    Route::get('cart/totalprice/user/{id}', 'CartController@getTotalPrice');
    Route::post('user/order', 'OrderController@placeOrder'); 
    Route::patch('user/data/{id}', 'AccountManagementController@updateUserData'); 
    Route::get('user/favorite-vendors/{user_id}', 'FavoriteController@getFavoriteVendors'); 
});
