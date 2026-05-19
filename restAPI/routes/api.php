<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\FriendRequestController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\ProfileController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API working'
    ]);
});

Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);


Route::middleware('auth:sanctum')->group(function(){

    Route::get('/me', [AuthController::class,'me']);
    Route::post('/logout', [AuthController::class,'logout']);

    Route::get('/my-posts', [PostController::class, 'myPosts']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);

    Route::get('/friend-requests', [FriendRequestController::class, 'index']);
    Route::post('/friend-requests', [FriendRequestController::class, 'store']);
    Route::patch('/friend-requests/{friendRequest}/accept', [FriendRequestController::class, 'accept']);
    Route::patch('/friend-requests/{friendRequest}/reject', [FriendRequestController::class, 'reject']);
    Route::delete('/friend-requests/{friendRequest}', [FriendRequestController::class, 'destroy']);

    Route::get('/friends', [FriendController::class, 'index']);
    Route::delete('/friends/{friend}', [FriendController::class, 'destroy']);

    Route::get('/players', [PlayerController::class, 'index']);

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
});
