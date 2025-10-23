import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user from auth
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { amount, screenshot_url, user_name, user_email, remarks } = await req.json();

    // Validate input
    if (!amount || amount < 1) {
      throw new Error('Invalid amount');
    }

    if (!screenshot_url) {
      throw new Error('Payment screenshot is required');
    }

    if (!user_name || !user_email) {
      throw new Error('User information is required');
    }

    console.log('Creating credit request for user:', user.id);

    // Insert credit request into database
    const { data: creditRequest, error: insertError } = await supabaseClient
      .from('credit_requests')
      .insert({
        user_id: user.id,
        amount,
        status: 'pending',
        payment_screenshot_url: screenshot_url,
        user_name,
        user_email,
        remarks: remarks || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    console.log('Credit request created:', creditRequest.id);

    // Send data to n8n webhook
    const webhookUrl = 'https://n8n.aiagentra.com/webhook/payment-pending';
    const webhookPayload = {
      request_id: creditRequest.id,
      user_id: user.id,
      user_name,
      user_email,
      amount,
      screenshot_url,
      remarks: remarks || '',
      timestamp: new Date().toISOString(),
      status: 'pending',
    };

    console.log('Sending to webhook:', webhookUrl);

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook error:', await webhookResponse.text());
      // Don't throw error - request is still created in database
    } else {
      console.log('Webhook sent successfully');
    }

    return new Response(
      JSON.stringify({
        success: true,
        request_id: creditRequest.id,
        status: 'pending',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
