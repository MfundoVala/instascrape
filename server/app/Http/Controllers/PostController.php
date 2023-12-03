<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Support\Facades\Http;

require_once __DIR__ . '/../../../vendor/autoload.php';

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{

    public function apifyScrapePostsByHashtag(Request $request) {
        Log::info($request);

        $hashtag = $request->hashtag ?? 'cake';
        $max_posts = $request->max_posts ?? 3;
        $apifyUrl = "https://api.apify.com/v2/acts/apify~instagram-hashtag-scraper/run-sync-get-dataset-items?token=". env('APIFY_TOKEN');

        try {
            $response = Http::timeout(-1)->post($apifyUrl, [
                'hashtags' => [ $hashtag ],
                'resultsLimit' => $max_posts,
                'format' => 'json',
                'waitForFinish' => 0,
            ]);

            $medias = $response->json();

            Log::info($medias);

            foreach($medias as $media) {
                $post = new Post();
                $post->post_id = $media['id']??null;
                $post->hashtagId = strtolower($hashtag); // will be real hashtag id when using Instagram graph API
                $post->post_created_time = $media['timestamp']??null;
                $post->type = $media['type']??null;
                $post->link = $media['url']??null;
                $post->image_low_resolution_url = $media['imageLowResolutionUrl']??null;
                $post->image_thumbnail_url = $media['imageThumbnailUrl']??null;
                $post->image_standard_resolution_url = $media['displayUrl']??null;
                $post->image_base64 = $this->convertToBase64($media['displayUrl'])??null;
                $post->image_high_resolution_url = $media['imageHighResolutionUrl']??null;
                $post->caption = $media['caption']??null;
                $post->caption_is_edited = $media['captionIsEdited']??null;
                $post->is_ad = $media['isSponsored']??null;
                $post->video_low_resolution_url = $media['videoLowResolutionUrl']??null;
                $post->video_standard_resolution_url = $media['videoStandardResolutionUrl']??null;
                $post->video_low_bandwidth_url = $media['videoLowBandwidthUrl']??null;
                $post->video_views = $media['videoViews']??null;
                $post->code = $media['shortCode']??null;
                $post->owner_full_name = $media['ownerFullName']??null;
                $post->owner_username = $media['ownerUsername']??null;
                $post->owner_id = $media['ownerId']??null;
                $post->likes_count = $media['likesCount']??null;
                $post->location_id = $media['locationId']??null;
                $post->location_name = $media['locationName']??null;
                $post->comments_count = $media['commentsCount']??null;
                $post->save();
        }

        $posts = Post::where('hashtagId', strtolower($hashtag))->orderBy('post_created_time', 'desc')->get();

        return response()->json($posts);
            
        } catch (\Throwable $th) {
            Log::info($th);
            return response()->json($th);
        }
    }

    protected function convertToBase64($url) {
        $type = pathinfo($url, PATHINFO_EXTENSION);
        $data = file_get_contents($url);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        return $base64;
    }

    public function getDatabasePostsByHashtag(Request $request) {
        $hashtag = $request->hashtag;
        $posts = Post::where('hashtagId', strtolower($hashtag))->orderBy('post_created_time', 'desc')->get();
        return response()->json($posts);
    }

    public function runApifyActorSync(Request $request) {
        $hashtag = $request->hashtag ?? 'cake';
        $max_posts = $request->max_posts ?? 3;
        $apifyUrl = "https://api.apify.com/v2/acts/apify~instagram-hashtag-scraper/run-sync-get-dataset-items?token=". env('APIFY_TOKEN');
        $response = Http::post($apifyUrl, [
            'hashtags' => [ $hashtag ],
            'resultsLimit' => $max_posts,
            'format' => 'json',
            'waitForFinish' => 0,
        ]);
        Log::info($response->json());
        return response()->json($response->json());
    }

    public function getApifyRunHashtagNames(Request $request) {
        $run = $request->runId ?? "last";
        $apifyUrl = "https://api.apify.com/v2/acts/apify~instagram-hashtag-scraper/runs/". $run ."/request-queue/requests?token=". env('APIFY_TOKEN');
        $response = Http::get($apifyUrl);
        Log::info($response->json());   
        
        if(isset($response->json()['error'])) {
            return response()->json($response->json());
        }
        $hashtags = $response->json()['data']['items'][0]['userData']['rootParent']['name'];
        return response()->json($hashtags);
    }
}
    
