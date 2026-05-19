<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Friend;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    public function index(Request $request)
    {
        $friends = Friend::with('friendUser:id,name,email')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($friends);
    }

    public function destroy(Request $request, Friend $friend)
    {
        if ($request->user()->id !== $friend->user_id) {
            return response()->json([
                'message' => 'You are not allowed to remove this friend',
            ], 403);
        }

        $friendId = $friend->friend_id;
        $userId = $friend->user_id;

        Friend::where('user_id', $userId)
            ->where('friend_id', $friendId)
            ->delete();

        Friend::where('user_id', $friendId)
            ->where('friend_id', $userId)
            ->delete();

        return response()->json([
            'message' => 'Friend removed successfully',
        ]);
    }
}
