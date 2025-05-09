import { saveAs } from 'file-saver';
import type { Database } from '../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

const formatDate = (date: string | null) => {
  if (!date) return '';
  return new Date(date).toLocaleString('sl-SI');
};

export const exportReviewsToCSV = (reviews: Review[], companyName: string) => {
  // Define CSV headers
  const headers = [
    'Datum',
    'Ocena',
    'Tip',
    'Komentar',
    'Email',
    'Telefon',
    'Izbrane težave',
    'Zaključeno',
    'Google preusmeritev',
    'Način preusmeritve'
  ];

  // Transform reviews to CSV rows
  const csvData = reviews.map(review => [
    formatDate(review.created_at),
    review.rating,
    review.flow_type === 'high_rating_gamification' ? 'Visoka ocena' : 'Nizka ocena',
    review.comment || '',
    review.email || '',
    review.phone || '',
    (review.feedback_options || []).join(', '),
    review.completed_at ? 'Da' : 'Ne',
    formatDate(review.redirected_to_google_at),
    review.google_redirect_type || ''
  ]);

  // Combine headers and data
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.map(cell => 
      typeof cell === 'string' && cell.includes(',') 
        ? `"${cell.replace(/"/g, '""')}"` 
        : cell
    ).join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob(['\ufeff' + csvContent], { 
    type: 'text/csv;charset=utf-8' 
  });
  
  saveAs(blob, `${companyName.toLowerCase().replace(/\s+/g, '-')}-ocene-${new Date().toISOString().split('T')[0]}.csv`);
};