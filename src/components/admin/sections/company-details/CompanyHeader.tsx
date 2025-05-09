import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, ExternalLink, Copy, Link as LinkIcon, Download, Star } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import Button from '../../../shared/Button';
import { translations } from '../../../../translations/sl';
import ImageWithFallback from '../../../shared/ImageWithFallback';
import { exportReviewsToCSV } from '../../../../utils/export';
import type { Database } from '../../../../types/database';

type Company = Database['public']['Tables']['companies']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

interface CompanyHeaderProps {
  company: Company;
  reviews: Review[];
  loading?: boolean;
}

interface AdminLogoProps {
  className?: string;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company, reviews, loading = false }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [copyingId, setCopyingId] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopyingId(id);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setCopyingId(null), 2000);
  };
  
  // Generate review link
  const reviewLink = `${window.location.origin}/review/${company.id}`;

  const handleBackClick = () => {
    navigate('/admin');
  };
  
  // Handle CSV export
  const handleExportCSV = () => {
    exportReviewsToCSV(reviews, company.name);
  };

  return (
    <div className="bg-white border-b shadow-md relative z-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-white to-purple-50/30 opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleBackClick}
              variant="ghost"
              leftIcon={<ArrowLeft className="h-5 w-5 text-blue-600" />}
              className="hover:bg-white/80 border border-blue-100 shadow-sm"
            >
              <span className="text-sm font-medium">{translations.app.admin.company.back}</span>
            </Button>
            <Link to="/home" className="text-sm text-blue-600 hover:text-blue-800 ml-2">
              <span>Domov</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {company.logo_url ? (
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center shadow-md">
                  <img
                    src={company.logo_url}
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('bg-indigo-100');
                      const fallbackIcon = document.createElement('div');
                      fallbackIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-indigo-600"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>';
                      e.currentTarget.parentElement?.appendChild(fallbackIcon);
                    }}
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center shadow-md">
                  <Star className="h-7 w-7 text-amber-400" />
                </div>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">{company.name}</h1>
                {loading ? (
                  <div className="flex items-center gap-2 mt-1">
                    <LoadingSpinner size="sm" color="indigo" />
                    <span className="text-sm text-gray-500">Loading data...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">
                      {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} total
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <Button
              as="a"
              href={company.google_link}
              target="_blank" 
              rel="noopener noreferrer"
              variant="primary"
              className="shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              leftIcon={<ExternalLink className="h-4 w-4" />}
            >
              {translations.app.admin.company.viewOnGoogle}
            </Button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-blue-100/40 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] sm:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-blue-500" />
                {translations.app.admin.company.reviewLink}
              </div>
              <button 
                onClick={() => copyToClipboard(reviewLink, 'review-link')}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
              >
                <Copy className="h-3 w-3" />
                {copied && copyingId === 'review-link' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 overflow-x-auto hover:bg-gray-50/80 transition-colors">
              {reviewLink}
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-blue-100/40 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-blue-500" />
                {translations.app.admin.company.id}
              </div>
              <button 
                onClick={() => copyToClipboard(company.id, 'company-id')}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
              >
                <Copy className="h-3 w-3" />
                {copied && copyingId === 'company-id' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-sm font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 overflow-x-auto hover:bg-gray-50/80 transition-colors">
              {company.id}
            </div>
          </div>
          
          <div className="sm:col-span-3 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportCSV}
              leftIcon={<Download className="h-4 w-4 text-blue-600" />}
              className="border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="text-sm text-blue-600">Export CSV</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;