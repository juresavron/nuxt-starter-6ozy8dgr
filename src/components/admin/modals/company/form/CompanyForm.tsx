import React from 'react';
import { ErrorSeverity } from '../../../../../utils/errorHandler';
import ErrorAlert from '../../../../shared/ErrorAlert';
import { useTranslations } from '../../../../../hooks/useTranslations';
import CompanyNameField from './CompanyNameField';
import GoogleLinkField from './GoogleLinkField';
import LogoUrlField from './LogoUrlField';
import ColorSchemeSelector from './ColorSchemeSelector';
import GiftDescriptionField from './GiftDescriptionField';
import IndustrySelector from './IndustrySelector';
import IndustryFeedbackOptions from './IndustryFeedbackOptions';
import CouponTypeSelector from './CouponTypeSelector';
import LotteryDrawingSettings from './LotteryDrawingSettings';
import SMSSettingsToggle from './SMSSettingsToggle';
import SocialTasksSection from './SocialTasksSection';
import NotificationsTab from './NotificationsTab';

interface CompanyFormProps {
  companyData: {
    name: string;
    google_link: string;
    logo_url: string;
    color_scheme: string;
    gift_description: string;
    industry_id: string | null;
    feedback_options: string[];
    mid_rating_feedback_options?: string[];
    coupon_type: 'coupon' | 'lottery' | 'none';
    lottery_drawing_frequency?: string;
    lottery_drawing_day?: number;
    send_coupon_sms?: boolean;
    send_coupon_sms_delay?: number;
    send_google_sms?: boolean;
    send_google_sms_delay?: number;
    send_thank_you_email?: boolean; 
    send_coupon_email?: boolean;
    send_review_reminder_email?: boolean;
    send_google_review_email?: boolean;
    social_tasks: {
      platform: string;
      url: string;
    }[];
  };
  handleChange: (field: string, value: any) => void;
  formError?: string | null;
  isSubmitting?: boolean;
  activeTab: string;
  handleSocialTasks?: {
    add: () => void;
    remove: (index: number) => void;
    update: (index: number, field: 'platform' | 'url', value: string) => void;
  };
}

/**
 * Reusable company form component for both adding and editing companies
 * Now organized with tabs
 */
const CompanyForm: React.FC<CompanyFormProps> = ({
  companyData,
  handleChange,
  formError,
  isSubmitting = false,
  activeTab,
  handleSocialTasks
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.form || {};
  
  // Handle industry change and clear feedback options
  const handleIndustryChange = (industryId: string) => {
    // Update industry_id
    handleChange('industry_id', industryId);
    // Clear feedback options when industry changes
    handleChange('feedback_options', []);
    handleChange('mid_rating_feedback_options', []);
  };

  // Error message is visible on all tabs
  const ErrorMessage = formError && (
    <ErrorAlert 
      message={formError} 
      severity={ErrorSeverity.ERROR}
    />
  );

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6">
            {ErrorMessage}
            
            {/* Company Name */}
            <CompanyNameField 
              name={companyData.name}
              onChange={(value) => handleChange('name', value)}
              placeholder={t.namePlaceholder || "Vnesite ime podjetja"}
              label={t.name || "Ime podjetja"}
              disabled={isSubmitting}
            />

            {/* Google Link */}
            <GoogleLinkField 
              googleLink={companyData.google_link}
              onChange={(value) => handleChange('google_link', value)}
              placeholder={t.googleLinkPlaceholder || "https://g.page/..."}
              label={t.googleLink || "Google povezava"}
              disabled={isSubmitting}
            />

            {/* Logo URL */}
            <LogoUrlField 
              logoUrl={companyData.logo_url}
              onChange={(value) => handleChange('logo_url', value)}
              helpText={t.logoRequirements || "URL do logotipa podjetja"}
              label={t.logo || "Logotip (neobvezno)"}
              disabled={isSubmitting}
            />

            {/* Color Scheme */}
            <ColorSchemeSelector 
              selectedScheme={companyData.color_scheme}
              onChange={(value) => handleChange('color_scheme', value)}
              disabled={isSubmitting}
              label={t.colorScheme || "Barvna shema"}
            />
          </div>
        );
        
      case 'industry':
        return (
          <div className="space-y-6">
            {ErrorMessage}
            
            {/* Industry Selector */}
            <IndustrySelector
              industryId={companyData.industry_id}
              onChange={handleIndustryChange}
              label={t.industry || "Industrija"}
              disabled={isSubmitting}
              key={`industry-selector-${companyData.industry_id || 'new'}`}
            />

            {/* Industry-Specific Feedback Options for Low Ratings (1-3) */}
            <IndustryFeedbackOptions
              industryId={companyData.industry_id}
              selectedOptions={companyData.feedback_options}
              onOptionChange={(options) => handleChange('feedback_options', options)}
              label={t.feedbackOptions || "Možnosti povratnih informacij (1-3 zvezdice)"}
              description={t.feedbackOptionsDescription || "Te možnosti bodo prikazane strankam, ki pustijo nizke ocene"}
              disabled={isSubmitting}
              flowType="low_rating"
            />

            {/* Industry-Specific Feedback Options for Mid Ratings (4) */}
            <IndustryFeedbackOptions
              industryId={companyData.industry_id}
              selectedOptions={companyData.mid_rating_feedback_options || []}
              onOptionChange={(options) => handleChange('mid_rating_feedback_options', options)}
              label={t.midRatingFeedbackOptions || "Možnosti povratnih informacij (4 zvezdice)"}
              description={t.midRatingFeedbackOptionsDescription || "Te možnosti bodo prikazane strankam, ki pustijo 4 zvezdice"}
              disabled={isSubmitting}
              flowType="mid_rating"
            />
          </div>
        );
        
      case 'rewards':
        return (
          <div className="space-y-6">
            {ErrorMessage}
            
            {/* Coupon Type Selector */}
            <CouponTypeSelector
              couponType={companyData.coupon_type}
              onChange={(value) => handleChange('coupon_type', value)}
              disabled={isSubmitting}
              label={t.couponType?.title || "Tip nagrade"}
            />

            {/* Lottery Drawing Settings - only show if coupon_type is 'lottery' */}
            {companyData.coupon_type === 'lottery' && (
              <LotteryDrawingSettings
                drawingFrequency={companyData.lottery_drawing_frequency || 'monthly'}
                drawingDay={companyData.lottery_drawing_day || 1}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            )}

            {/* Gift Description - only show if coupon_type is not 'none' */}
            {companyData.coupon_type !== 'none' && (
              <GiftDescriptionField 
                giftDescription={companyData.gift_description}
                onChange={(value) => handleChange('gift_description', value)}
                placeholder={t.gift?.placeholder || "npr. 10% popust pri naslednjem obisku"}
                label={t.gift?.title || "Darilo za oceno"}
                description={t.gift?.description || "Opis darila, ki ga bo stranka prejela po oddani oceni (prikazano v zahvalnem e-mailu)"}
                disabled={isSubmitting}
              />
            )}
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            {ErrorMessage}
            
            <NotificationsTab
              companyData={companyData}
              handleChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
        );
        
      case 'social':
        return (
          <div className="space-y-6">
            {ErrorMessage}
            
            {/* Social Media Tasks */}
            {handleSocialTasks && (
              <SocialTasksSection
                tasks={companyData.social_tasks}
                onAddTask={handleSocialTasks.add}
                onRemoveTask={handleSocialTasks.remove}
                onUpdateTask={handleSocialTasks.update}
                disabled={isSubmitting}
              />
            )}
          </div>
        );
        
      default:
        return <div>{ErrorMessage}</div>;
    }
  };

  return (
    <div>
      {renderTabContent()}
    </div>
  );
};

export default React.memo(CompanyForm);