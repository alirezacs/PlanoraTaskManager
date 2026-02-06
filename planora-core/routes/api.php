<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;

/* Auth Routes */
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);
Route::post('register', [RegisterController::class, 'register']);
Route::get('me', [LoginController::class, 'me'])->middleware('auth:sanctum');
Route::put('profile', [ProfileController::class, 'update'])->middleware('auth:sanctum');
/* Auth Routes */

/* Password Reset Routes */
Route::post('/forgot-password', [PasswordResetController::class, 'forgotPassword'])->middleware('auth:sanctum');
Route::post('/password-reset', [PasswordResetController::class, 'reset'])->name('password.reset');
/* Password Reset Routes */

Route::middleware(['auth:sanctum'])->group(function () {
    /* Task Routes */
    Route::apiResource('task', TaskController::class);
    Route::put('task/{task}/status', [TaskController::class, 'updateStatus']);
    /* Task Routes */

    /* User Routes */
    Route::apiResource('user', UserController::class);
    /* User Routes */
});
