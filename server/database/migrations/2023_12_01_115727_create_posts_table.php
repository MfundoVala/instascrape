<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {

            $table->id();
            $table->string('post_id')->nullable();
            $table->string('hashtagId')->nullable();
            $table->string('owner_full_name')->nullable();
            $table->string('owner_username')->nullable();
            $table->string('owner_id')->nullable();
            $table->string('likes_count')->nullable();
            $table->string('location_id')->nullable();
            $table->longText('location_name')->nullable();
            $table->string('comments_count')->nullable();
            $table->string('type')->nullable();
            $table->longText('link')->nullable();
            $table->longText('image_low_resolution_url')->nullable();
            $table->longText('image_thumbnail_url')->nullable();
            $table->longText('image_standard_resolution_url')->nullable();
            $table->longText('image_high_resolution_url')->nullable();
            $table->longText('image_base64')->nullable();
            $table->longText('caption')->nullable();
            $table->string('caption_is_edited')->nullable();
            $table->boolean('is_ad')->nullable();
            $table->longText('video_low_resolution_url')->nullable();
            $table->longText('video_standard_resolution_url')->nullable();
            $table->longText('video_low_bandwidth_url')->nullable();
            $table->longText('video_views')->nullable();
            $table->string('post_created_time')->nullable();
            $table->string('post_created_at')->nullable();
            $table->string('code')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
