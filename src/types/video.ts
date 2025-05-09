import type { LucideIcon } from 'lucide-react';

export interface VideoFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
}

export interface VideoTestimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  image?: string;
}