<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Friend;
use App\Models\FriendRequest;
use Illuminate\Http\Request;

class FriendRequestController extends Controller
{
    public function index(Request $request)
    {
        $received = FriendRequest::with('sender:id,name,email')
            ->where('receiver_id', $request->user()->id)
            ->where('status', 'pending')
            ->latest()
            ->get();

        $sent = FriendRequest::with('receiver:id,name,email')
            ->where('sender_id', $request->user()->id)
            ->where('status', 'pending')
            ->latest()
            ->get();

        return response()->json([
            'received' => $received,
            'sent' => $sent,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => ['required', 'exists:users,id'],
        ]);

        $senderId = $request->user()->id;
        $receiverId = (int) $validated['receiver_id'];

        if ($senderId === $receiverId) {
            return response()->json([
                'message' => 'You cannot send a friend request to yourself',
            ], 422);
        }

        $alreadyFriends = Friend::where('user_id', $senderId)
            ->where('friend_id', $receiverId)
            ->exists();

        if ($alreadyFriends) {
            return response()->json([
                'message' => 'You are already friends with this user',
            ], 422);
        }

        $existingRequest = FriendRequest::where('status', 'pending')
            ->where(function ($query) use ($senderId, $receiverId) {
                $query->where(function ($q) use ($senderId, $receiverId) {
                    $q->where('sender_id', $senderId)
                        ->where('receiver_id', $receiverId);
                })
                    ->orWhere(function ($q) use ($senderId, $receiverId) {
                        $q->where('sender_id', $receiverId)
                            ->where('receiver_id', $senderId);
                    });
            })
            ->exists();

        if ($existingRequest) {
            return response()->json([
                'message' => 'A pending friend request already exists',
            ], 422);
        }

        $friendRequest = FriendRequest::create([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Friend request sent successfully',
            'friend_request' => $friendRequest,
        ], 201);
    }

    public function accept(Request $request, FriendRequest $friendRequest)
    {
        if ($request->user()->id !== $friendRequest->receiver_id) {
            return response()->json([
                'message' => 'You are not allowed to accept this request',
            ], 403);
        }

        if ($friendRequest->status !== 'pending') {
            return response()->json([
                'message' => 'This request is no longer pending',
            ], 422);
        }

        $friendRequest->update([
            'status' => 'accepted',
        ]);

        Friend::create([
            'user_id' => $friendRequest->sender_id,
            'friend_id' => $friendRequest->receiver_id,
        ]);

        Friend::create([
            'user_id' => $friendRequest->receiver_id,
            'friend_id' => $friendRequest->sender_id,
        ]);

        return response()->json([
            'message' => 'Friend request accepted',
        ]);
    }

    public function reject(Request $request, FriendRequest $friendRequest)
    {
        if ($request->user()->id !== $friendRequest->receiver_id) {
            return response()->json([
                'message' => 'You are not allowed to reject this request',
            ], 403);
        }

        if ($friendRequest->status !== 'pending') {
            return response()->json([
                'message' => 'This request is no longer pending',
            ], 422);
        }

        $friendRequest->update([
            'status' => 'rejected',
        ]);

        return response()->json([
            'message' => 'Friend request rejected',
        ]);
    }

    public function destroy(Request $request, FriendRequest $friendRequest)
    {
        if ($request->user()->id !== $friendRequest->sender_id) {
            return response()->json([
                'message' => 'You are not allowed to cancel this request',
            ], 403);
        }

        if ($friendRequest->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending requests can be cancelled',
            ], 422);
        }

        $friendRequest->delete();

        return response()->json([
            'message' => 'Friend request cancelled successfully',
        ]);
    }
}
