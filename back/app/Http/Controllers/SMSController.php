<?php

namespace App\Http\Controllers;

use Twilio\Rest\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SMSController extends Controller
{
    public function send(Request $request)
    {
        $sid = env('TWILIO_SID');
        $token = env('TWILIO_TOKEN');
        $twilioPhoneNumber = env('TWILIO_PHONE_NUMBER');
        
        $twilio = new Client($sid, $token);

        try {
            Log::info('Attempting to send SMS');
            $message = $twilio->messages->create(
                $request->input('phone'),
                [
                    'from' => $twilioPhoneNumber,
                    'body' => $request->input('message')
                ]
            );

            Log::info('SMS sent successfully');
            return response()->json(['message' => 'SMS envoyé avec succès']);
        } catch (\Exception $e) {
            Log::error('Error sending SMS: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur : ' . $e->getMessage()], 500);
        }
    }
}
