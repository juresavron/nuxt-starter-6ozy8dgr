import { OpenAI } from "npm:openai@4.24.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface AIGenerationRequest {
  companyName: string;
  rating: number;
  comment?: string;
  selectedIssues?: string[];
  emailType?: string;
  language?: string;
  giftDescription?: string;
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
        JSON.stringify({ error: 'Server configuration error' }),
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
        JSON.stringify({ error: 'Invalid request body format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Validate required fields
    if (!payload.companyName || !payload.rating) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: companyName or rating' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Email generation
    // Create detailed system prompt based on language and review details
    const language = payload.language || 'sl';
    let systemPrompt = '';
    
    if (language === 'en') {
      systemPrompt = `You are an AI assistant that creates personalized, professional emails for business communications.
      Your emails are well-structured with proper greeting, body, and closing.
      You write in a friendly but professional tone that represents the company well.
      Keep paragraphs short and scannable. Use proper grammar and punctuation.
      Format appropriately with <p> tags for paragraphs and include appropriate HTML styling.
      
      For negative reviews (1-3 stars):
      - Show genuine concern about the issues raised
      - Be empathetic and understanding
      - Acknowledge specific problems mentioned
      - Explain how feedback helps improve the business
      - Mention specific steps that will be taken to address issues
      - Thank them for their honesty
      - Invite them to give the business another chance
      
      For mid-rating reviews (4 stars):
      - Thank them for their mostly positive review
      - Acknowledge the areas that need improvement
      - Show appreciation for constructive feedback
      - Mention how you'll address their specific concerns
      - Express hope they'll have an even better experience next time
      
      For positive reviews (5 stars):
      - Express sincere gratitude for their excellent review
      - Mention specific points they praised if available
      - Show genuine delight in their great experience
      - Invite them to return
      - Thank them for supporting the business`;
    } else if (language === 'it') {
      systemPrompt = `Sei un assistente AI che crea email personalizzate e professionali per le comunicazioni aziendali.
      Le tue email sono ben strutturate con un saluto appropriato, corpo e chiusura.
      Scrivi con un tono amichevole ma professionale che rappresenta bene l'azienda.
      Mantieni i paragrafi brevi e scansionabili. Utilizza grammatica e punteggiatura appropriate.
      Formatta adeguatamente con tag <p> per i paragrafi e includi uno stile HTML appropriato.
      
      Per recensioni negative (1-3 stelle):
      - Mostra genuina preoccupazione per i problemi sollevati
      - Sii empatico e comprensivo
      - Riconosci i problemi specifici menzionati
      - Spiega come il feedback aiuta a migliorare l'azienda
      - Menziona passi specifici che saranno intrapresi per risolvere i problemi
      - Ringrazia per l'onestà
      - Invitali a dare all'azienda un'altra possibilità
      
      Per recensioni di valutazione media (4 stelle):
      - Ringrazia per la recensione prevalentemente positiva
      - Riconosci le aree che necessitano di miglioramento
      - Mostra apprezzamento per il feedback costruttivo
      - Menziona come affronterai le loro preoccupazioni specifiche
      - Esprimi la speranza che avranno un'esperienza ancora migliore la prossima volta
      
      Per recensioni positive (5 stelle):
      - Esprimi sincera gratitudine per l'eccellente recensione
      - Menziona punti specifici che hanno lodato se disponibili
      - Mostra genuino piacere per la loro ottima esperienza
      - Invitali a tornare
      - Ringraziali per il supporto all'azienda`;
    } else {
      // Default to Slovenian
      systemPrompt = `Si AI pomočnik, ki ustvarja personalizirana, profesionalna e-poštna sporočila za poslovno komunikacijo.
      Tvoja e-poštna sporočila imajo dobro strukturo z ustreznim pozdravom, osrednjim delom in zaključkom.
      Pišeš v prijaznem, a profesionalnem tonu, ki dobro predstavlja podjetje.
      Odstavki naj bodo kratki in pregledni. Uporabljaj pravilno slovnico in ločila.
      Ustrezno oblikuj s <p> oznakami za odstavke in vključi primerno HTML oblikovanje.
      
      Za negativne ocene (1-3 zvezdice):
      - Pokaži iskreno zaskrbljenost glede izpostavljenih težav
      - Bodi empatičen in razumevajoč
      - Priznavaj specifične omenjene težave
      - Pojasni, kako povratne informacije pomagajo izboljšati podjetje
      - Omeni konkretne korake, ki bodo sprejeti za reševanje težav
      - Zahvali se za iskrenost
      - Povabi jih, da podjetju dajo še eno priložnost
      
      Za srednje ocene (4 zvezdice):
      - Zahvali se za večinoma pozitivno oceno
      - Priznaj področja, ki potrebujejo izboljšave
      - Pokaži hvaležnost za konstruktivne povratne informacije
      - Omeni, kako boš naslovil njihove specifične pomisleke
      - Izrazi upanje, da bodo imeli še boljšo izkušnjo naslednjič
      
      Za pozitivne ocene (5 zvezdic):
      - Izrazi iskreno hvaležnost za njihovo odlično oceno
      - Omeni specifične točke, ki so jih pohvalili, če so na voljo
      - Pokaži iskreno veselje ob njihovi odlični izkušnji
      - Povabi jih, da se vrnejo
      - Zahvali se jim za podporo podjetju`;
    }
    
    // Add specific guidance based on rating and issues
    const emailType = payload.emailType || (payload.rating <= 3 ? 'low_rating_feedback' : 
                                         payload.rating === 4 ? 'mid_rating_feedback' : 
                                         'high_rating_thank_you');
    
    // Add specific instructions based on email type
    switch (emailType) {
      case 'low_rating_feedback':
        systemPrompt += `\nThis email is responding to a ${payload.rating}-star review with specific feedback.
        Show genuine concern about the issues raised and thank the customer for their feedback.
        Acknowledge the specific issues they mentioned: ${payload.selectedIssues?.join(', ') || 'No specific issues mentioned'}
        ${payload.comment ? `They also commented: "${payload.comment}"` : 'They did not leave additional comments.'}
        Emphasize that their feedback helps improve the business.
        Don't be defensive but be appreciative of the feedback.
        Mention specific steps that will be taken to address their concerns.
        Invite them to contact the business directly to discuss their experience further.
        End with a sincere apology and invitation to give the business another chance.`;
        break;
        
      case 'mid_rating_feedback':
        systemPrompt += `\nThis email is responding to a 4-star review with generally positive feedback but some areas for improvement.
        Thank the customer for their mostly positive review.
        Acknowledge the specific improvement areas they mentioned: ${payload.selectedIssues?.join(', ') || 'No specific issues mentioned'}
        ${payload.comment ? `They also commented: "${payload.comment}"` : 'They did not leave additional comments.'}
        Show appreciation for their constructive feedback.
        Mention how you'll address their specific concerns.
        Express hope they'll have an even better experience next time.
        Invite them to return soon.`;
        break;
        
      case 'high_rating_thank_you':
      default:
        systemPrompt += `\nThis email is thanking a customer for their 5-star review.
        Express sincere gratitude for their excellent review.
        ${payload.comment ? `They commented: "${payload.comment}"` : 'They did not leave additional comments.'}
        Mention you're delighted they had a great experience.
        Invite them to come back again.
        Thank them for their support of the business.
        Encourage them to tell friends and family about their experience.`;
        
        if (payload.giftDescription) {
          systemPrompt += `\nRemind them about their reward: "${payload.giftDescription}" which they can use on their next visit.`;
        }
        break;
    }

    // Create user prompt
    const userPrompt = `Please create a professional email for a customer who left a ${payload.rating}-star review for ${payload.companyName}.
    ${payload.selectedIssues && payload.selectedIssues.length > 0 ? `They specifically mentioned these issues: ${payload.selectedIssues.join(', ')}` : ''}
    ${payload.comment ? `Their comment was: "${payload.comment}"` : ''}
    
    I need:
    1. A good subject line
    2. HTML email body with appropriate formatting
    
    The email should be in ${language === 'en' ? 'English' : language === 'it' ? 'Italian' : 'Slovenian'}.`;

    // Call OpenAI API with timeout and retry logic
    let response;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        // Set up AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 600,
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
          throw new Error(`Failed to generate email after ${maxRetries} attempts: ${error.message}`);
        }
        
        // Exponential backoff with jitter
        const delay = Math.floor(Math.random() * 1000) + Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (!response || !response.choices[0].message) {
      throw new Error('No response from OpenAI API');
    }

    // Parse the response to extract subject and HTML content
    const generatedContent = response.choices[0].message.content?.trim() || '';
    
    // Extract subject and HTML content
    const subjectMatch = generatedContent.match(/Subject:(.+?)(?:\n|$)/i);
    const subject = subjectMatch ? subjectMatch[1].trim() : `Thank you for your review of ${payload.companyName}`;
    
    // Remove the subject line and any other preamble to get just the HTML content
    let html = generatedContent
      .replace(/Subject:(.+?)(?:\n|$)/i, '')
      .trim();
      
    // Extract plain text version
    const text = html.replace(/<[^>]*>/g, '');

    // Return the generated email
    return new Response(
      JSON.stringify({ 
        success: true, 
        subject,
        html,
        text
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating AI email:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        // Provide fallback content
        success: false,
        subject: "Thank you for your feedback",
        html: "<p>Thank you for your feedback. We appreciate your time.</p>",
        text: "Thank you for your feedback. We appreciate your time."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});