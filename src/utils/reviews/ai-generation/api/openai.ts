/**
 * OpenAI API wrapper for generating email and SMS content
 */

// Define interfaces for API requests and responses
interface OpenAIRequest {
  model: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
  temperature?: number;
  max_tokens?: number;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

/**
 * Generate text using OpenAI API
 * @param prompt The prompt to generate text from
 * @param options Additional options for the API call
 * @returns The generated text
 */
export const generateWithOpenAI = async (
  systemPrompt: string,
  userPrompt: string,
  options: {
    temperature?: number;
    max_tokens?: number;
    model?: string;
  } = {}
): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
    
    // Build the request body
    const requestBody: OpenAIRequest = {
      model: options.model || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 200
    };
    
    // Call the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    // Extract the generated text from the response
    const data = await response.json() as OpenAIResponse;
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating text with OpenAI:', error);
    throw error;
  }
};

/**
 * Generate email content using OpenAI
 * @param context The context for the email generation
 * @returns Promise resolving to email content
 */
export const generateEmailContent = async (context: {
  companyName: string;
  rating: number;
  emailType: string;
  selectedIssues?: string[];
  comment?: string;
  language?: string;
}) => {
  const { companyName, rating, emailType, selectedIssues = [], comment, language = 'sl' } = context;
  
  // Create a detailed system prompt based on email type and language
  let systemPrompt;
  if (language === 'en') {
    systemPrompt = `You are an AI assistant that creates personalized, professional emails for business communications.
    Your emails are well-structured with proper greeting, body, and closing.
    You write in a friendly but professional tone that represents the company well.
    Keep paragraphs short and scannable. Use proper grammar and punctuation.
    Format appropriately with <p> tags for paragraphs and include appropriate HTML styling.`;
  } else if (language === 'it') {
    systemPrompt = `Sei un assistente AI che crea email personalizzate e professionali per le comunicazioni aziendali.
    Le tue email sono ben strutturate con un saluto appropriato, corpo e chiusura.
    Scrivi con un tono amichevole ma professionale che rappresenta bene l'azienda.
    Mantieni i paragrafi brevi e scansionabili. Utilizza grammatica e punteggiatura appropriate.
    Formatta adeguatamente con tag <p> per i paragrafi e includi uno stile HTML appropriato.`;
  } else {
    // Default to Slovenian
    systemPrompt = `Si AI pomočnik, ki ustvarja personalizirana, profesionalna e-poštna sporočila za poslovno komunikacijo.
    Tvoja e-poštna sporočila imajo dobro strukturo z ustreznim pozdravom, osrednjim delom in zaključkom.
    Pišeš v prijaznem, a profesionalnem tonu, ki dobro predstavlja podjetje.
    Odstavki naj bodo kratki in pregledni. Uporabljaj pravilno slovnico in ločila.
    Ustrezno oblikuj s <p> oznakami za odstavke in vključi primerno HTML oblikovanje.`;
  }
  
  // Add specific instructions based on email type
  switch (emailType) {
    case 'low_rating_feedback':
      systemPrompt += `\nThis email is responding to a ${rating}-star review with specific feedback.
      Show genuine concern about the issues raised and thank the customer for their feedback.
      Acknowledge the specific issues they mentioned: ${selectedIssues.join(', ')}
      ${comment ? `They also commented: "${comment}"` : 'They did not leave additional comments.'}
      Emphasize that their feedback helps improve the business.
      Don't be defensive but be appreciative of the feedback.`;
      break;
      
    case 'mid_rating_feedback':
      systemPrompt += `\nThis email is responding to a 4-star review with generally positive feedback but some areas for improvement.
      Thank the customer for their mostly positive review.
      Acknowledge the specific improvement areas they mentioned: ${selectedIssues.join(', ')}
      ${comment ? `They also commented: "${comment}"` : 'They did not leave additional comments.'}
      Show appreciation for their constructive feedback.
      Express hope they'll have an even better experience next time.`;
      break;
      
    case 'high_rating_thank_you':
      systemPrompt += `\nThis email is thanking a customer for their 5-star review.
      Express sincere gratitude for their excellent review.
      ${comment ? `They commented: "${comment}"` : 'They did not leave additional comments.'}
      Mention you're delighted they had a great experience.
      Invite them to come back again.
      Thank them for their support of the business.`;
      break;
  }
  
  // Create a detailed user prompt
  const userPrompt = `Please create a professional email to a customer who left a ${rating}-star review for ${companyName}.
  ${selectedIssues.length > 0 ? `They specifically mentioned these issues: ${selectedIssues.join(', ')}` : ''}
  ${comment ? `Their comment was: "${comment}"` : ''}
  
  I need both:
  1. A subject line
  2. HTML email body content
  
  The email should be in ${language === 'en' ? 'English' : language === 'it' ? 'Italian' : 'Slovenian'}.`;

  try {
    const generatedContent = await generateWithOpenAI(systemPrompt, userPrompt, {
      temperature: 0.7,
      max_tokens: 500
    });
    
    // Extract the subject line and body content from the response
    const subjectMatch = generatedContent.match(/Subject:(.+?)(?:\n|$)/i);
    const subject = subjectMatch ? subjectMatch[1].trim() : `Thank you for your review of ${companyName}`;
    
    // Remove the subject line from the content
    const bodyContent = generatedContent
      .replace(/Subject:(.+?)(?:\n|$)/i, '')
      .trim();
    
    // Return the extracted content
    return {
      subject,
      html: bodyContent,
      text: bodyContent.replace(/<[^>]*>/g, '')
    };
  } catch (error) {
    console.error('Error generating email content:', error);
    throw error;
  }
};

/**
 * Generate SMS content using OpenAI
 * @param context The context for the SMS generation
 * @returns Promise resolving to SMS content
 */
export const generateSMSContent = async (context: {
  companyName: string;
  rating: number;
  smsType: string;
  googleLink?: string;
  couponCode?: string;
  selectedIssues?: string[];
  comment?: string;
  language?: string;
}) => {
  const { 
    companyName, 
    rating, 
    smsType, 
    googleLink, 
    couponCode, 
    selectedIssues = [],
    comment,
    language = 'sl'
  } = context;
  
  // Create a detailed system prompt based on SMS type and language
  let systemPrompt;
  if (language === 'en') {
    systemPrompt = `You are an AI assistant that crafts personalized, professional SMS messages for businesses.
    Your messages are concise (maximum 160 characters), friendly, and to the point.
    You follow these rules:
    1. Keep the message under 160 characters
    2. Be professional but warm
    3. Include only essential information
    4. Include company name
    5. End with a clear call to action if appropriate`;
  } else if (language === 'it') {
    systemPrompt = `Sei un assistente AI che crea messaggi SMS personalizzati e professionali per le aziende.
    I tuoi messaggi sono concisi (massimo 160 caratteri), amichevoli e diretti.
    Segui queste regole:
    1. Mantieni il messaggio sotto i 160 caratteri
    2. Sii professionale ma cordiale
    3. Includi solo informazioni essenziali
    4. Includi il nome dell'azienda
    5. Termina con una chiara call to action se appropriato`;
  } else {
    // Default to Slovenian
    systemPrompt = `Si AI pomočnik, ki ustvarja personalizirana, profesionalna SMS sporočila za podjetja.
    Tvoja sporočila so jedrnata (največ 160 znakov), prijazna in neposredna.
    Upoštevaš naslednja pravila:
    1. Obdrži sporočilo pod 160 znakov
    2. Bodi profesionalen, a topel
    3. Vključi samo bistvene informacije
    4. Vključi ime podjetja
    5. Zaključi z jasnim pozivom k dejanju, če je primerno`;
  }

  // Create a detailed user prompt with context from the review
  let userPrompt = '';
  
  switch (smsType) {
    case 'google_redirect':
      userPrompt = `Create a brief SMS asking the customer to leave a review on Google for ${companyName}.
      They gave us a ${rating}-star rating.
      ${selectedIssues.length > 0 ? `They specifically mentioned these issues: ${selectedIssues.join(', ')}` : ''}
      ${comment ? `Their comment was: "${comment}"` : ''}
      Include the Google review link: ${googleLink || '[Google review link will be included]'}`;
      break;
      
    case 'coupon_code':
      userPrompt = `Create a brief SMS thanking the customer for their ${rating}-star review of ${companyName} and providing them with their coupon code: ${couponCode || 'COUPON123'}.
      ${selectedIssues.length > 0 ? `They mentioned these issues: ${selectedIssues.join(', ')}` : ''}
      ${comment ? `They commented: "${comment}"` : ''}
      Mention they can use this on their next visit.`;
      break;
      
    case 'thank_you':
    default:
      userPrompt = `Create a brief SMS thanking the customer for their ${rating}-star review of ${companyName}.
      ${selectedIssues.length > 0 ? `They mentioned these issues: ${selectedIssues.join(', ')}` : ''}
      ${comment ? `They commented: "${comment}"` : ''}
      Keep it simple, friendly and professional.`;
      break;
  }
  
  userPrompt += `\nThe message should be in ${language === 'en' ? 'English' : language === 'it' ? 'Italian' : 'Slovenian'}.`;

  try {
    const generatedSMS = await generateWithOpenAI(systemPrompt, userPrompt, {
      temperature: 0.7,
      max_tokens: 100
    });
    
    // Verify the SMS doesn't exceed 160 characters
    if (generatedSMS.length > 160) {
      console.warn('Generated SMS exceeds 160 characters, truncating');
      return { message: generatedSMS.substring(0, 157) + '...' };
    }
    
    return { message: generatedSMS };
  } catch (error) {
    console.error('Error generating SMS content:', error);
    throw error;
  }
};