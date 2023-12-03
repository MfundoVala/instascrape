<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get(
    '/getHashtagPosts',
    [PostController::class, 'scrapePostsByHashtag']
);

Route::get(
    '/getAccessToken',
    [AuthController::class, 'getAccessToken']
);

Route::get(
    '/scrapePostsByHashtag',
    [PostController::class, 'apifyScrapePostsByHashtag']
);

Route::get(
    '/getApifyRunHashtagNames',
    [PostController::class, 'getApifyRunHashtagNames']
);

Route::get(
    '/getHashtagPosts',
    [PostController::class, 'getDatabasePostsByHashtag']
);

Route::get(
    '/runApifyActorSync',
    [PostController::class, 'runApifyActorSync']
);
