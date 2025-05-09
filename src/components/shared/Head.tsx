import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  canonical?: string;
  structuredData?: Record<string, any>[];
}

const Head: React.FC<HeadProps> = ({
  title = 'Pridobite višje ocene na Googlu | ocenagor.si',
  description = 'Pridobite višje ocene na Googlu s pametnim sistemom za zbiranje ocen. Povečajte svoj spletni ugled in pridobite več strank.',
  keywords = 'Pridobite višje ocene na Googlu, Google ocene, višje ocene, spletni ugled, zbiranje ocen',
  image = 'https://ocenagor.si/icon-512.png',
  type = 'website',
  canonical,
  structuredData = [],
}) => {
  const location = useLocation();
  const currentUrl = canonical || `https://ocenagor.si${location.pathname}`;

  // Default structured data for website
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    url: 'https://ocenagor.si',
    description
  };
  
  // Combine default and custom structured data
  const allStructuredData = [defaultStructuredData, ...structuredData];

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="sl_SI" />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured data */}
      {allStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default Head;