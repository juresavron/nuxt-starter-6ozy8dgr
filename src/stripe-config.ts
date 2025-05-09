// Stripe product configuration
export const stripeProducts = {
  start: {
    id: 'start',
    priceId: 'price_1RFHp6IwHDvYCLGla6t9fm2z', 
    yearlyPriceId: 'price_1RFHp6IwHDvYCLGla6t9fm2z', // Same as monthly until yearly price is created
    name: 'Start',
    description: 'Za začetek poti k več ocenam',
    mode: 'subscription' as const,
    features: [
      '1x NFC kartica ali stojalo',
      'Prilagojena ocenjevalna stran',
      'Gejmifikacija (Instagram follow, nagrade)',
      'Zajem emaila / telefona',
      'Osnovna analitika',
      'Večjezična podpora (SLO / ENG / HR / DE)',
      'GDPR skladnost'
    ],
    price: '29.00',
    yearlyPrice: '299.00',
    currency: 'EUR',
    savings: '49.00', // Yearly savings compared to monthly
  },
  grow: {
    id: 'grow',
    priceId: 'price_1RFhltIwHDvYCLGlFOvBD9Da',
    yearlyPriceId: 'price_1RFhltIwHDvYCLGlFOvBD9Da', // Same as monthly until yearly price is created
    name: 'Grow',
    description: 'Z gejmifikacijo, več napravami, mesečnimi poročili',
    mode: 'subscription' as const,
    features: [
      'Vse iz Start paketa',
      'Do 3x NFC kartice/nalepke/stojala',
      'Osnovna analitika',
      'Mesečna poročila',
      'Povezava z več Google lokacijami',
      'Vodena nastavitev sistema',
      'Osnovna podpora'
    ],
    price: '39.00',
    yearlyPrice: '399.00',
    currency: 'EUR',
    savings: '69.00', // Yearly savings compared to monthly
    highlight: true,
  },
  pro: {
    id: 'pro',
    priceId: 'price_1RFhmVIwHDvYCLGlSuRlKYAA',
    yearlyPriceId: 'price_1RFhmVIwHDvYCLGlSuRlKYAA', // Same as monthly until yearly price is created
    name: 'Pro',
    description: 'Za več lokacij, integracije, white-label',
    mode: 'subscription' as const,
    features: [
      'Vse iz Grow paketa',
      'Do 5 lokacij / profilov',
      'White-label (brez logotipa ocenagor.si)',
      'Napredna analitika + CSV izvoz',
      'Integracija z Mailchimp / CRM / Zapier',
      'Prednostna podpora',
      'Ocenjevanje zaposlenih (unikaten URL)',
      'Ekipa kontaktira nezadovoljne stranke'
    ],
    price: '149.00',
    yearlyPrice: '799.00',
    currency: 'EUR',
    savings: '989.00', // Yearly savings compared to monthly
  }
};

// Helper function to get product by ID
export function getProductById(id: string) {
  // First try to match by id property
  const productByKey = stripeProducts[id as keyof typeof stripeProducts];
  if (productByKey) return productByKey;
  
  // Then try to match by priceId
  return Object.values(stripeProducts).find(product => 
    product.priceId === id || product.id === id
  );
}

// Helper function to get product by name
export function getProductByName(name: string) {
  return Object.values(stripeProducts).find(product => 
    product.name.toLowerCase() === name.toLowerCase()
  );
}