<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user:id,name')
            ->latest()
            ->get();

        return response()->json($posts);
    }

    public function myPosts(Request $request)
    {
        $posts = $request->user()
            ->posts()
            ->latest()
            ->get();

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'queue_type' => ['required', 'string', 'max:100'],
            'preferred_role' => ['required', 'string', 'max:50'],
            'rank_tier' => ['required', 'string', 'max:50'],
            'region' => ['required', 'string', 'max:50'],
            'mic_required' => ['required', 'boolean'],
            'status' => ['required', 'string', 'in:active,closed'],
        ]);

        $post = $request->user()->posts()->create($validated);

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post,
        ], 201);
    }

    public function show(Post $post)
    {
        $post->load('user:id,name');

        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        if ($request->user()->id !== $post->user_id) {
            return response()->json([
                'message' => 'You are not allowed to update this post',
            ], 403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'queue_type' => ['required', 'string', 'max:100'],
            'preferred_role' => ['required', 'string', 'max:50'],
            'rank_tier' => ['required', 'string', 'max:50'],
            'region' => ['required', 'string', 'max:50'],
            'mic_required' => ['required', 'boolean'],
            'status' => ['required', 'string', 'in:active,closed'],
        ]);

        $post->update($validated);

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post,
        ]);
    }

    public function destroy(Request $request, Post $post)
    {
        if ($request->user()->id !== $post->user_id) {
            return response()->json([
                'message' => 'You are not allowed to delete this post',
            ], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully',
        ]);
    }
}
