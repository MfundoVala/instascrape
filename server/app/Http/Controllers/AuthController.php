<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    //
    public function getAccessToken(Request $request)
    {
        $app_id = env('INSTAGRAM_APP_ID');
        $app_secret = env('INSTAGRAM_APP_SECRET');
        $redirect_uri = env('INSTAGRAM_REDIRECT_URI');

        // $response = Http::asForm()->post('https://api.instagram.com/oauth/access_token', [
        //     'client_id' => $app_id,
        //     'client_secret' => $app_secret,
        //     'grant_type' => 'authorization_code',
        //     'redirect_uri' => $redirect_uri,
        //     'code' => $request->code
        // ]);

        // $access_token = $response->json()['access_token'];


        $access_token = "EAAPfmyLsuSABO2ycnFcM45L82pR2tM6wUZB99rHAGYRFAC8rAZAWbVGkZCCmEww4I2SYzYZAek3EtAd2WKmOZAJBCZAGXZA0ZCJiDz86l2cLOJGTdk8xr2GeSV0GuXZAleHu4Rcpjvy5q27ELHZCZBiVqWQRMrFSDVvbkg7qeGmGPNJZBYY2WZB2R7cnTDAs6uD6HYB8qMmk4ZC2aZAcJ09IwT6NUU4yhWAooL17RmklBCT7d32tZADzQDi4U8RRWtYgFKwZD";
        $code = "AQBsQxZSitTENdqhBPLgyocnc3ABTmKOgrVcmcEMHK_rgPs-3XuD9YXfgaanqMSm3VjOqtU9M7MPbSIl8UMn2Vg7zOaDObrM9Lgom5InfCZfYwrCtWruLNqgt1hxklOqwhTE2povP0yUYJ8EC8QTovGzwaeg-u4w-msElU4SMrkW80B6afDlHYWTL4ZtQqe7-ET837TCL2yWguzVcAEXJ5dptMctxVsD-L1R91xmp2kbsA#_";


        $ch = curl_init();

        // $url = "https://api.instagram.com/oauth/authorize?client_id=" . $app_id . "&redirect_uri=" . $redirect_uri . "&scope=user_profile,user_media&response_type=code";
        $url = "https://api.instagram.com/oauth/access_token?client_id=" . $app_id . "&client_secret=" . $app_secret . "&grant_type=authorization_code&redirect_uri=" . $redirect_uri . "&code=" . $code;

        Log::info($url);

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

        $headers = array();
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }

        curl_close($ch);

        return response()->json([
            'result' => $result,
        ]);


    }
}
