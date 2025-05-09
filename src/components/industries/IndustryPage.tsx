import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useIndustryData } from '../../hooks/useIndustryData';
import IndustryHero from './sections/IndustryHero';
import IndustryStats from './sections/IndustryStats';
import IndustryBenefits from './sections/IndustryBenefits';
import IndustryFeatures from './sections/IndustryFeatures';
import IndustryTestimonials from './sections/IndustryTestimonials';
import IndustryCTA from './sections/IndustryCTA';
import LoadingSpinner from '../shared/LoadingSpinner';
import NotFound from '../shared/NotFound';

const IndustryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { industry, loading, error } = useIndustryData(slug);

  // Handle loading state
  if (loading || !industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <LoadingSpinner size="lg" color="indigo" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <NotFound 
        title="Industry Not Found"
        message="The industry you're looking for doesn't exist or has been removed."
        actionText="Back to Home"
        actionLink="/"
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${industry.title} | ocenagor.si`}</title>
        <meta name="description" content={industry.subtitle} />
        <meta property="og:title" content={`${industry.title} | ocenagor.si`} />
        <meta property="og:description" content={industry.subtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://ocenagor.si/industrije/${slug}`} />
        <meta property="og:image" content={industry.heroImage || "https://ocenagor.si/icon-512.png"} />
        <link rel="canonical" href={`https://ocenagor.si/industrije/${slug}`} />
      </Helmet>
      
      <main className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <IndustryHero 
          title={industry.title}
          subtitle={industry.subtitle}
          image={industry.heroImage}
          tags={industry.tags}
        />
        
        <IndustryStats stats={industry.stats} />
        
        <IndustryBenefits benefits={industry.benefits} />
        
        <IndustryFeatures features={industry.features} />
        
        <IndustryTestimonials testimonials={industry.testimonials} />
        
        <IndustryCTA 
          title={industry.ctaTitle || `Improve Your ${industry.title} Business Today`}
          description={industry.ctaDescription || "Start collecting more reviews and followers with our smart system"}
          features={industry.ctaFeatures}
          image={industry.ctaImage}
          onAction={() => navigate('/contact')}
        />
      </main>
    </>
  );
};

export default IndustryPage;