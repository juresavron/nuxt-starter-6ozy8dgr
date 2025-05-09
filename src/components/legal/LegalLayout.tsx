import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/90">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Nazaj na domačo stran
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 font-heading">
            {title}
          </h1>
        </header>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <div className="prose prose-indigo max-w-none">
            {children}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Zadnja posodobitev: 1. april 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default React.memo(LegalLayout);