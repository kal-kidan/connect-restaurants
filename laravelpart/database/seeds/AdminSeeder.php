<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('users')->insert([
        //     'firstname' => "kalkidan",
        //     'lastname' => "tesfaye",
        //     'email' => "admin@gmail.com",
        //     'gender' => "female",
        //     'phonenumber' => "0942793296",
        //     'role' => "admin",
        //     'password' => "admin123",
        // ]);
        User::create([
            'firstname' => "kalkidan",
            'lastname' => "tesfaye",
            'email' => "admin@gmail.com",
            'gender' => "female",
            'phonenumber' => "0942793296",
            'role' => "admin",
            'password' => "admin123",
        ]);
    }
}
