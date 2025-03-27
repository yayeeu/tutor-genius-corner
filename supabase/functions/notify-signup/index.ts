
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      throw new Error("Name and email are required")
    }

    // In a production environment, you would use a proper email service
    // like SendGrid, Resend, or AWS SES with authentication
    console.log(`Notification email would be sent to contact@edunova.com about new signup:
      Name: ${name}
      Email: ${email}
    `)

    // This is just a mock response since we don't have actual email sending set up
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification sent to admin" 
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    )
  } catch (error) {
    console.error("Error in notify-signup:", error.message)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    )
  }
})
