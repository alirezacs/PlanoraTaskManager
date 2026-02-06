<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)) {
            return apiResponse(data: \auth()->user()->toArray(), message: 'Login Successful');
        }else{
            return apiResponse(message: 'Credentials not matched', status: 401);
        }
    }

    public function me()
    {
        return apiResponse(data: \auth()->user()->toArray());
    }

    public function logout(Request $request)
    {
        auth()->logout();
        $request->session()->invalidate();

        return apiResponse(message: 'Logout Successful');
    }
}
