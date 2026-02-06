<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RegisterRequest;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisterController extends Controller
{
    /**
     * @param RegisterRequest $request
     * @return ResponseFactory|Application|Response|object
     */
    public function register(RegisterRequest $request)
    {
        $data = $request->only(['full_name', 'email', 'password']);

        /* Register User */
        $user = User::create($data);
        /* Register User */

        /* Login User */
        auth()->login($user);
        /* Login User */

        return apiResponse(data: $user->toArray(), message: 'Registered successfully');
    }
}
