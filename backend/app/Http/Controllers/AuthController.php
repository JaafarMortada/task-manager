<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {

        $credentials = $request->only('email', 'password');
        $token = Auth::guard('api')->attempt($credentials);


        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $user->token = $token;

        $user->role = $user->role()->first()->role;

        return response()->json([
            'message' => 'logged in successfully',
            'user' => $user
        ], 200);
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|between:2,100',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:6',
            ]);
        } catch (\Throwable $e) {
            return response()->json(
                [
                    "message" => 'validation failed',
                    "error" => $e->getMessage()
                ],
                422
            );
        }

        $role = Role::where('role', $request->role)->first();

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $role->id;
        $user->password = Hash::make($request->password);
        $user->save();

        $token = Auth::guard('api')->login($user);
        $user->token = $token;
        $user->role = $user->role()->first()->role;

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 200);
    }

    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
    }

    public function refresh()
    {
        $token = Auth::guard('api')->refresh();
        $user = Auth::guard('api')->user();
        $user->role = $user->role()->first()->role;

        $user->token = $token;
        return response()->json([
            'message' => 'refreshed successfully',
            'user' => $user
        ], 200);
    }
}
