import type { LucideIcon } from 'lucide-react';

export interface IndustryStatistic {
  icon: LucideIcon | string;
  value: string;
  text: string;
}

export interface IndustryBenefit {
  icon: LucideIcon | string;
  title: string;
  description: string;
  features: string[];
}

export interface IndustryFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface IndustryTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
}

export interface IndustryDetails {
  title: string;
  subtitle: string;
  tags: string[];
  heroImage?: string;
  stats: IndustryStatistic[];
  benefits: IndustryBenefit[];
  features?: IndustryFeature[];
  testimonials: IndustryTestimonial[];
  ctaFeatures: string[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaImage: string;
}