<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'summoner_name',
        'riot_region',
        'preferred_role',
        'secondary_role',
        'rank_tier',
        'availability_text',
        'bio',
        'is_public',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
