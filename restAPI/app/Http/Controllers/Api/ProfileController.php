<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user()->load('playerProfile');

        return response()->json([
            'user' => $user,
            'profile' => $user->playerProfile,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'summoner_name' => ['nullable', 'string', 'max:100'],
            'riot_region' => ['nullable', 'string', 'max:50'],
            'preferred_role' => ['nullable', 'string', 'max:50'],
            'secondary_role' => ['nullable', 'string', 'max:50'],
            'rank_tier' => ['nullable', 'string', 'max:50'],
            'availability_text' => ['nullable', 'string', 'max:500'],
            'bio' => ['nullable', 'string', 'max:1000'],
            'is_public' => ['required', 'boolean'],
        ]);

        $profile = $request->user()->playerProfile;

        if (! $profile) {
            $profile = $request->user()->playerProfile()->create($validated);
        } else {
            $profile->update($validated);
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile,
        ]);
    }
}