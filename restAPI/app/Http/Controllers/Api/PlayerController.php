<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Friend;
use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function index(Request $request)
    {
        $authUserId = $request->user()->id;

        $players = User::with('playerProfile')
            ->where('id', '!=', $authUserId)
            ->get()
            ->map(function ($user) use ($authUserId) {
                $isFriend = Friend::where('user_id', $authUserId)
                    ->where('friend_id', $user->id)
                    ->exists();

                $pendingRequest = FriendRequest::where('status', 'pending')
                    ->where(function ($query) use ($authUserId, $user) {
                        $query->where(function ($q) use ($authUserId, $user) {
                            $q->where('sender_id', $authUserId)
                              ->where('receiver_id', $user->id);
                        })
                        ->orWhere(function ($q) use ($authUserId, $user) {
                            $q->where('sender_id', $user->id)
                              ->where('receiver_id', $authUserId);
                        });
                    })
                    ->first();

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'player_profile' => $user->playerProfile,
                    'is_friend' => $isFriend,
                    'pending_request' => $pendingRequest ? [
                        'id' => $pendingRequest->id,
                        'sender_id' => $pendingRequest->sender_id,
                        'receiver_id' => $pendingRequest->receiver_id,
                        'status' => $pendingRequest->status,
                    ] : null,
                ];
            });

        return response()->json($players);
    }
}