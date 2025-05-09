/**
 * Detect language from text
 * @param text Text to analyze
 * @returns Language code ('sl', 'en', or 'it')
 */
export const detectLanguage = (text: string): string => {
  // Simple language detection based on common words
  // In a production environment, use a proper language detection library
  
  if (!text || typeof text !== 'string') {
    return 'sl'; // Default to Slovenian
  }
  
  const normalizedText = text.toLowerCase();
  
  // English indicators
  const englishWords = ['the', 'and', 'is', 'in', 'to', 'it', 'that', 'was', 'for', 'on'];
  const englishCount = englishWords.filter(word => 
    normalizedText.includes(` ${word} `) || 
    normalizedText.startsWith(`${word} `) || 
    normalizedText.endsWith(` ${word}`)
  ).length;
  
  // Italian indicators
  const italianWords = ['il', 'la', 'e', 'che', 'di', 'è', 'un', 'per', 'con', 'sono'];
  const italianCount = italianWords.filter(word => 
    normalizedText.includes(` ${word} `) || 
    normalizedText.startsWith(`${word} `) || 
    normalizedText.endsWith(` ${word}`)
  ).length;
  
  // Slovenian indicators
  const slovenianWords = ['je', 'in', 'da', 'se', 'na', 'so', 'bi', 'pa', 'za', 'ne'];
  const slovenianCount = slovenianWords.filter(word => 
    normalizedText.includes(` ${word} `) || 
    normalizedText.startsWith(`${word} `) || 
    normalizedText.endsWith(` ${word}`)
  ).length;
  
  // Return the language with the highest count
  if (englishCount > slovenianCount && englishCount > italianCount) {
    return 'en';
  } else if (italianCount > slovenianCount && italianCount > englishCount) {
    return 'it';
  } else {
    return 'sl'; // Default to Slovenian if tied or no clear winner
  }
};

export default detectLanguage;