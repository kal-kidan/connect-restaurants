<?php
namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use App\Http\Middleware\CORS;
class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','signup']]);
    }

    public function signup(Request $request){

    if($request->role=="customer"){
        $request->validate([
            'firstname' =>'required|regex:/[a-zA-Z]*$/|max:30',
            'lastname' =>'required|regex:/[a-zA-Z]*$/|max:30',
            'email' =>'required|email|unique:users|max:255',
            'phonenumber' =>'required|regex:/^(\+2519)[0-9]{8}$/',
            'password' =>'required|min:6|string'
        ]);
        $user=User::create($request->all());
        return $this->login($request);
    }

    else if($request->role=="vendor"){
        $request->validate([
            'email' =>'required|email|max:255',
            'password' =>'required|min:6|string|same:confirmpassword'
        ]);
        $user = User::where('email', $request->email)->where('role','vendor')->get();
        if(count($user)==0){
            return response()->json(['error' => 'this email hasn\'t been registered by admin'], 400);
        }
        else{
            $user[0]->password = $request->password;
            $user[0]->coverimage = "/images/coverPic.png";
            $user[0]->save();
            return $this->login($request);
        }

    }



    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'email or password is incorrect'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    public function user(Request $request){
        $user = User::find($request->id);
        if($user){
            return response()->json($user);
        }
        else{
            return response()->json(['error' => 'user not found'], 400);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        if(auth()->user()->role=="customer"){
            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
                'user' => auth()->user()->email,
                'role' => auth()->user()->role,
                'id' => auth()->user()->id
            ]);
        }
        else if(auth()->user()->role=="vendor"){
            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
                'id' => auth()->user()->id,
                'role' => auth()->user()->role,
                'cafename' => auth()->user()->cafename,
                'coverImage'=> auth()->user()->coverimage
            ]);
        }

    }
}
