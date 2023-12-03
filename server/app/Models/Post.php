<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    // instagram api post model
    protected $fillable = [
        'post_id',
        'hashtagId',
        'owner_full_name',
        'owner_username',
        'owner_id',
        'likes_count',
        'location_id',
        'location_name',
        'comments_count',
        'post_created_time',
        'type',
        'link',
        'image_low_resolution_url',
        'image_thumbnail_url',
        'image_standard_resolution_url',
        'image_high_resolution_url',
        'image_base64',
        'caption',
        'caption_is_edited',
        'is_ad',
        'video_low_resolution_url',
        'video_standard_resolution_url',
        'video_low_bandwidth_url',
        'video_views',
        'code',
    ];

    protected $casts = [
        'post_created_at' => 'datetime',
    ];
        
}
