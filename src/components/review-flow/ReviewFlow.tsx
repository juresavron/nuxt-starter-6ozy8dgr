import * as React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useReviewFlow from '../../hooks/review-flow/useReviewFlow';
import { translations } from '../../translations/sl';
import { useCompanyData } from '../../hooks/useCompanyData';
import { isValidUUID } from '../../utils/validation';
import ReviewContainer from './ReviewContainer';
import { usePreventIOSSwipeBack } from '../../hooks/usePreventIOSSwipeBack';
import RatingStep from './RatingStep';
import FeedbackStep from './FeedbackStep';
import LoadingSpinner from '../shared/LoadingSpinner';
import ReviewContent from './ReviewContent';

const ReviewFlow: React.FC = () => {
  const { companyId } = useParams();
  const decodedCompanyId = decodeURIComponent(companyId || '');
  const validCompanyId = isValidUUID(decodedCompanyId) ? decodedCompanyId : undefined;
  const navigate = useNavigate();
  const { loading: companyLoading, company, error: companyError } = useCompanyData(validCompanyId);
  
  // Prevent iOS swipe back
  usePreventIOSSwipeBack();

  const reviewFlowState = useReviewFlow(validCompanyId);

  // Log when component renders with key state
  useEffect(() => {
    console.log('ReviewFlow: Component rendered', { 
      companyId: validCompanyId,
      rating: reviewFlowState.rating,
      showForm: reviewFlowState.showForm,
      reviewId: reviewFlowState.reviewId,
      isSubmitting: reviewFlowState.isSubmitting
    });
  }, [
    validCompanyId, 
    reviewFlowState.rating, 
    reviewFlowState.showForm, 
    reviewFlowState.reviewId, 
    reviewFlowState.isSubmitting
  ]);

  if (companyLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
        <ReviewContainer
          loading={true}
          error={null}
          companyId={validCompanyId}
          colorScheme={company?.color_scheme}
        >
          <LoadingSpinner />
        </ReviewContainer>
      </div>
    );
  }

  if (companyError || !validCompanyId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
        <ReviewContainer
          loading={false}
          error={companyError}
          companyId={validCompanyId}
          colorScheme={company?.color_scheme}
        >
          <div className="text-center text-red-600">
            {companyError || 'Invalid company ID'}
          </div>
        </ReviewContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <ReviewContainer
        loading={companyLoading}
        error={companyError}
        companyId={validCompanyId}
        colorScheme={company?.color_scheme}
      >
        <ReviewContent
          navigate={navigate}
          company={company}
          {...reviewFlowState}
        />
      </ReviewContainer>
    </div>
  );
};

export default React.memo(ReviewFlow);