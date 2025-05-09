import { OpenAI } from "npm:openai@4.24.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface AIGenerationRequest {
  reviewId?: string;
  companyName: string;
  rating: number;
  comment?: string;
  selectedIssues?: string[];
  phone?: string;
  smsType: 'google_redirect' | 'coupon_code' | 'thank_you';
  couponCode?: string;
  googleLink?: string;
  language?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Get OpenAI API key from environment variables
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      console.error('OPENAI_API_KEY environment variable is not set');
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error',
          success: false,
          message: "Thank you for your feedback."
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    // Parse request body
    let payload: AIGenerationRequest;
    try {
      payload = await req.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request body format',
          success: false,
          message: "Thank you for your feedback."
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Validate required fields
    if (!payload.companyName || !payload.smsType) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: companyName or smsType',
          success: false,
          message: "Thank you for your feedback."
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Determine SMS type and generate appropriate prompt
    let systemPrompt = '';
    let userPrompt = '';
    
    const language = payload.language || 'sl';
    
    // Create system prompt based on language
    if (language === 'en') {
      systemPrompt = `You are an AI assistant that crafts personalized, professional SMS messages for businesses. 
      Your messages are concise (maximum 160 characters), friendly, and to the point.
      You never use emojis or exclamation marks.
      You follow these rules:
      1. Keep the message under 160 characters
      2. Be professional but warm
      3. Include only essential information
      4. Do not use emojis or excessive punctuation
      5. Include company name
      6. End with a clear call to action if appropriate
      7. Make the message personal and conversational, as if from a real person
      8. For negative reviews, acknowledge the issues and show commitment to improvement
      9. For positive reviews, express gratitude and encourage sharing the experience`;
    } else if (language === 'it') {
      systemPrompt = `Sei un assistente AI che crea messaggi SMS personalizzati e professionali per le aziende.
      I tuoi messaggi sono concisi (massimo 160 caratteri), amichevoli e diretti.
      Non usi mai emoji o punti esclamativi.
      Segui queste regole:
      1. Mantieni il messaggio sotto i 160 caratteri
      2. Sii professionale ma cordiale
      3. Includi solo informazioni essenziali
      4. Non usare emoji o punteggiatura eccessiva
      5. Includi il nome dell'azienda
      6. Termina con una chiara call to action se appropriato
      7. Rendi il messaggio personale e conversazionale, come se provenisse da una persona reale
      8. Per recensioni negative, riconosci i problemi e mostra impegno per migliorare
      9. Per recensioni positive, esprimi gratitudine e incoraggia a condividere l'esperienza`;
    } else {
      // Default to Slovenian
      systemPrompt = `Si AI pomočnik, ki ustvarja personalizirana, profesionalna SMS sporočila za podjetja.
      Tvoja sporočila so jedrnata (največ 160 znakov), prijazna in neposredna.
      Nikoli ne uporabljaš emojijev ali klicajev.
      Upoštevaš naslednja pravila:
      1. Obdrži sporočilo pod 160 znakov
      2. Bodi profesionalen, a topel
      3. Vključi samo bistvene informacije
      4. Ne uporabljaj emojijev ali pretirane ločila
      5. Vključi ime podjetja
      6. Zaključi z jasnim pozivom k dejanju, če je primerno
      7. Naredi sporočilo osebno in pogovorno, kot da prihaja od resnične osebe
      8. Za negativne ocene, priznavaj težave in pokaži zavezanost k izboljšavam
      9. Za pozitivne ocene, izrazi hvaležnost in spodbujaj deljenje izkušnje`;
    }
    
    // Create user prompt based on SMS type
    switch (payload.smsType) {
      case 'google_redirect':
        userPrompt = createGoogleRedirectPrompt(payload, language);
        break;
      case 'coupon_code':
        userPrompt = createCouponCodePrompt(payload, language);
        break;
      case 'thank_you':
        userPrompt = createThankYouPrompt(payload, language);
        break;
      default:
        return new Response(
          JSON.stringify({ 
            error: 'Invalid SMS type',
            success: false,
            message: "Thank you for your feedback."
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
    }

    // Call OpenAI API with timeout and retry logic
    let response;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        // Set up AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 100,
          temperature: 0.7,
          // @ts-ignore: AbortSignal is not recognized in the type definition
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        break; // Success, exit retry loop
      } catch (error) {
        retryCount++;
        console.error(`OpenAI API call failed (attempt ${retryCount}/${maxRetries}):`, error);
        
        if (error.name === 'AbortError') {
          console.warn('OpenAI API call timed out');
        }
        
        if (retryCount >= maxRetries) {
          throw new Error(`Failed to generate SMS after ${maxRetries} attempts: ${error.message}`);
        }
        
        // Exponential backoff with jitter
        const delay = Math.floor(Math.random() * 1000) + Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (!response || !response.choices[0].message) {
      throw new Error('No response from OpenAI API');
    }

    // Extract generated message
    const generatedSMS = response.choices[0].message.content?.trim();
    
    if (!generatedSMS) {
      throw new Error('Empty response from OpenAI API');
    }
    
    // Ensure message is not too long for SMS
    const finalMessage = generatedSMS.length > 160 
      ? generatedSMS.substring(0, 157) + '...' 
      : generatedSMS;

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: finalMessage 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating AI SMS:', error);
    
    // Create fallback message based on SMS type
    let fallbackMessage = "Thank you for your feedback.";
    
    if (payload?.smsType === 'google_redirect') {
      fallbackMessage = `Thank you for your review of ${payload.companyName}. Please consider leaving a review on Google.`;
    } else if (payload?.smsType === 'coupon_code') {
      fallbackMessage = `Thank you for your review of ${payload.companyName}. Your coupon code is: ${payload.couponCode || 'COUPON123'}`;
    } else if (payload?.smsType === 'thank_you') {
      fallbackMessage = `Thank you for your review of ${payload.companyName}. We appreciate your feedback!`;
    }
    
    // Ensure message is not too long for SMS
    if (fallbackMessage.length > 160) {
      fallbackMessage = fallbackMessage.substring(0, 157) + '...';
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        message: fallbackMessage
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Helper function to create Google redirect prompt
function createGoogleRedirectPrompt(payload: AIGenerationRequest, language: string): string {
  const { companyName, rating, googleLink, comment, selectedIssues } = payload;
  
  // Create a more personalized prompt based on rating
  let personalizedPrompt = '';
  
  if (rating <= 3) {
    // For negative reviews
    personalizedPrompt = `The customer gave a ${rating}-star rating and had some concerns: ${selectedIssues?.join(', ') || 'No specific issues mentioned'}. 
    ${comment ? `They commented: "${comment}"` : 'They did not leave additional comments.'} 
    Create a personalized SMS that acknowledges their concerns, thanks them for the feedback, and still politely asks them to share their experience on Google.`;
  } else {
    // For positive reviews
    personalizedPrompt = `The customer gave a ${rating}-star rating and had a positive experience. 
    ${comment ? `They commented: "${comment}"` : 'They did not leave additional comments.'} 
    Create a personalized SMS that thanks them for their positive feedback and encourages them to share their experience on Google to help others.`;
  }
  
  if (language === 'en') {
    return `Create a brief, personalized SMS (max 160 chars) for ${companyName} asking the customer to leave a review on Google.
    ${personalizedPrompt}
    Include the Google review link: ${googleLink || '[Google review link will be included]'}
    Make it sound like it's coming from a real person at the company, not automated.`;
  } else if (language === 'it') {
    return `Crea un breve SMS personalizzato (massimo 160 caratteri) per ${companyName} che chieda al cliente di lasciare una recensione su Google.
    ${personalizedPrompt}
    Includi il link per la recensione Google: ${googleLink || '[Il link per la recensione Google sarà incluso]'}
    Fallo sembrare come se provenisse da una persona reale dell'azienda, non automatizzato.`;
  } else {
    // Default to Slovenian
    return `Ustvari kratek, oseben SMS (največ 160 znakov) za ${companyName}, ki stranko prosi, da pusti oceno na Googlu.
    ${personalizedPrompt}
    Vključi povezavo za Google oceno: ${googleLink || '[Povezava za Google oceno bo vključena]'}
    Naj zveni, kot da prihaja od resnične osebe v podjetju, ne avtomatizirano.`;
  }
}

// Helper function to create coupon code prompt
function createCouponCodePrompt(payload: AIGenerationRequest, language: string): string {
  const { companyName, couponCode, rating, comment, selectedIssues } = payload;
  
  // Create a more personalized prompt based on rating
  let personalizedPrompt = '';
  
  if (rating <= 3) {
    // For negative reviews
    personalizedPrompt = `The customer gave a ${rating}-star rating and had some concerns: ${selectedIssues?.join(', ') || 'No specific issues mentioned'}. 
    ${comment ? `They commented: "${comment}"` : 'They did not leave additional comments.'} 
    Create a personalized SMS that acknowledges their concerns, thanks them for the feedback, and provides their coupon code as a gesture of goodwill.`;
  } else {
    // For positive reviews
    personalizedPrompt = `The customer gave a ${rating}-star rating and had a positive experience. 
    ${comment ? `They commented: "${comment}"` : 'They did not leave additional comments.'} 
    Create a personalized SMS that thanks them for their positive feedback and provides their coupon code as a token of appreciation.`;
  }
  
  if (language === 'en') {
    return `Create a brief, personalized SMS (max 160 chars) for ${companyName} thanking the customer for their review and providing their coupon code.
    ${personalizedPrompt}
    Include their coupon code: ${couponCode || 'COUPON123'}
    Make it sound like it's coming from a real person at the company, not automated.
    Mention they can use this on their next visit.`;
  } else if (language === 'it') {
    return `Crea un breve SMS personalizzato (massimo 160 caratteri) per ${companyName} che ringrazi il cliente per la sua recensione e gli fornisca il suo codice coupon.
    ${personalizedPrompt}
    Includi il codice coupon: ${couponCode || 'COUPON123'}
    Fallo sembrare come se provenisse da una persona reale dell'azienda, non automatizzato.
    Menziona che può usarlo alla sua prossima visita.`;
  } else {
    // Default to Slovenian
    return `Ustvari kratek, oseben SMS (največ 160 znakov) za ${companyName}, ki se stranki zahvali za oceno in ji posreduje kuponsko kodo.
    ${personalizedPrompt}
    Vključi kuponsko kodo: ${couponCode || 'KUPON123'}
    Naj zveni, kot da prihaja od resnične osebe v podjetju, ne avtomatizirano.
    Omeni, da lahko to uporabi ob naslednjem obisku.`;
  }
}

// Helper function to create thank you prompt
function createThankYouPrompt(payload: AIGenerationRequest, language: string): string {
  const { companyName, rating, comment, selectedIssues } = payload;
  
  // Create a more personalized prompt based on rating
  let personalizedPrompt = '';
  
  if (rating <= 3) {
    // For negative reviews
    personalizedPrompt = `The customer gave a ${rating}-star rating and had some concerns: ${selectedIssues?.join(', ') || 'No specific issues mentioned'}. 
    ${comment ? `They commented: "${comment}"` : 'They did not leave additional comments.'} 
    Create a personalized SMS that acknowledges their concerns, thanks them for the feedback, and shows commitment to improving their experience next time.`;
  } else {
    // For positive reviews
    personalizedPrompt = `The customer gave a ${rating}-star rating and had a positive experience. 
    ${comment ? `They commented: "${comment}"` : 'They did not leave additional comments.'} 
    Create a personalized SMS that thanks them warmly for their positive feedback and invites them to visit again.`;
  }
  
  if (language === 'en') {
    return `Create a brief, personalized SMS (max 160 chars) for ${companyName} thanking the customer for their ${rating}-star review.
    ${personalizedPrompt}
    Make it sound like it's coming from a real person at the company, not automated.
    Include a personal touch that references their specific feedback.`;
  } else if (language === 'it') {
    return `Crea un breve SMS personalizzato (massimo 160 caratteri) per ${companyName} che ringrazi il cliente per la sua recensione di ${rating} stelle.
    ${personalizedPrompt}
    Fallo sembrare come se provenisse da una persona reale dell'azienda, non automatizzato.
    Includi un tocco personale che faccia riferimento al loro feedback specifico.`;
  } else {
    // Default to Slovenian
    return `Ustvari kratek, oseben SMS (največ 160 znakov) za ${companyName}, ki se stranki zahvali za ${rating}-zvezdično oceno.
    ${personalizedPrompt}
    Naj zveni, kot da prihaja od resnične osebe v podjetju, ne avtomatizirano.
    Vključi osebni dotik, ki se nanaša na njihove specifične povratne informacije.`;
  }
}