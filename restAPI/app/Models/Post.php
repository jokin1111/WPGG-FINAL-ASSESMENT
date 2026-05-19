<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	protected $fillable = [
        'user_id',
        'title',
        'description',
        'queue_type',
        'preferred_role',
        'rank_tier',
        'region',
        'mic_required',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
