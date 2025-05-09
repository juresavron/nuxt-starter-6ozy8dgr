import React from 'react';
import { Mail, MessageSquare, Bell, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../../../../utils/cn';
import { useTranslations } from '../../../../../hooks/useTranslations';
import SMSSettingsToggle from './SMSSettingsToggle';
import EmailSettingsToggle from './EmailSettingsToggle';

interface NotificationsTabProps {
  companyData: {
    // SMS settings
    send_coupon_sms?: boolean;
    send_coupon_sms_delay?: number;
    send_google_sms?: boolean;
    send_google_sms_delay?: number;
    // Email settings
    send_thank_you_email?: boolean; 
    send_thank_you_email_delay?: number;
    send_coupon_email?: boolean;
    send_coupon_email_delay?: number;
    send_review_reminder_email?: boolean;
    send_review_reminder_email_delay?: number;
    send_google_review_email?: boolean;
    send_google_review_email_delay?: number;
  };
  handleChange: (field: string, value: any) => void;
  disabled?: boolean;
}

/**
 * Notifications tab for company form
 * Controls which emails and SMS notifications are sent and when
 */
const NotificationsTab: React.FC<NotificationsTabProps> = ({
  companyData,
  handleChange,
  disabled = false
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.notifications || {
    title: 'Notifications',
    description: 'Configure which notifications are sent to customers',
    sms: {
      title: 'SMS Notifications',
      description: 'Configure which SMS messages are sent to customers',
      coupon: {
        label: 'Send SMS with coupon code after review',
        description: 'Customer will receive an SMS with their coupon code after submitting a review'
      },
      google: {
        label: 'Send SMS with Google review link',
        description: 'Customer will receive an SMS with a link to leave a Google review'
      }
    },
    email: {
      title: 'Email Notifications',
      description: 'Configure which emails are sent to customers',
      thankYou: {
        label: 'Send thank you email after review',
        description: 'Customer will receive a thank you email after submitting a review'
      },
      coupon: {
        label: 'Send email with coupon code',
        description: 'Customer will receive an email with their coupon code'
      },
      reviewReminder: {
        label: 'Send review reminder email',
        description: 'Send a reminder email if the customer hasn\'t completed their review'
      },
      googleReview: {
        label: 'Send Google review request email',
        description: 'Send an email asking the customer to leave a Google review'
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* SMS Notifications Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">{t.title || 'Notifications'}</h3>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">
          {t.description || 'Configure which notifications are sent to customers'}
        </p>
        
        {/* SMS Settings */}
        <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100/80 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <h4 className="font-medium text-blue-800">{t.sms?.title || 'SMS Notifications'}</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {t.sms?.description || 'Configure which SMS messages are sent to customers'}
          </p>
          
          <SMSSettingsToggle
            checked={companyData.send_coupon_sms || false}
            onChange={(checked) => handleChange('send_coupon_sms', checked)}
            onDelayChange={(delay) => handleChange('send_coupon_sms_delay', delay)}
            delay={companyData.send_coupon_sms_delay || 0}
            label={t.sms?.coupon?.label || 'Send SMS with coupon code after review'}
            description={t.sms?.coupon?.description || 'Customer will receive an SMS with their coupon code after submitting a review'}
            disabled={disabled}
          />
          
          <SMSSettingsToggle
            checked={companyData.send_google_sms || false}
            onChange={(checked) => handleChange('send_google_sms', checked)}
            onDelayChange={(delay) => handleChange('send_google_sms_delay', delay)}
            delay={companyData.send_google_sms_delay || 0}
            label={t.sms?.google?.label || 'Send SMS with Google review link'}
            description={t.sms?.google?.description || 'Customer will receive an SMS with a link to leave a Google review'}
            disabled={disabled}
          />
        </div>
        
        {/* Email Settings */}
        <div className="p-5 bg-indigo-50/50 rounded-xl border border-indigo-100/80 space-y-4 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-indigo-500" />
            <h4 className="font-medium text-indigo-800">{t.email?.title || 'Email Notifications'}</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {t.email?.description || 'Configure which emails are sent to customers'}
          </p>
          
          <EmailSettingsToggle
            checked={companyData.send_thank_you_email !== false} // Default to true
            onChange={(checked) => handleChange('send_thank_you_email', checked)}
            onDelayChange={(delay) => handleChange('send_thank_you_email_delay', delay)}
            delay={companyData.send_thank_you_email_delay || 0}
            label={t.email?.thankYou?.label || 'Send thank you email after review'}
            description={t.email?.thankYou?.description || 'Customer will receive a thank you email after submitting a review'}
            disabled={disabled}
            icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          />
          
          <EmailSettingsToggle
            checked={companyData.send_coupon_email !== false} // Default to true
            onChange={(checked) => handleChange('send_coupon_email', checked)}
            onDelayChange={(delay) => handleChange('send_coupon_email_delay', delay)}
            delay={companyData.send_coupon_email_delay || 0}
            label={t.email?.coupon?.label || 'Send email with coupon code'}
            description={t.email?.coupon?.description || 'Customer will receive an email with their coupon code'}
            disabled={disabled}
            icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
          />
          
          <EmailSettingsToggle
            checked={companyData.send_google_review_email || false}
            onChange={(checked) => handleChange('send_google_review_email', checked)}
            onDelayChange={(delay) => handleChange('send_google_review_email_delay', delay)}
            delay={companyData.send_google_review_email_delay || 0}
            label={t.email?.googleReview?.label || 'Send Google review request email'}
            description={t.email?.googleReview?.description || 'Send an email asking the customer to leave a Google review'}
            disabled={disabled}
            icon={<AlertCircle className="h-4 w-4 text-blue-500" />}
          />
          
          <EmailSettingsToggle
            checked={companyData.send_review_reminder_email || false}
            onChange={(checked) => handleChange('send_review_reminder_email', checked)}
            onDelayChange={(delay) => handleChange('send_review_reminder_email_delay', delay)}
            delay={companyData.send_review_reminder_email_delay || 60}
            label={t.email?.reviewReminder?.label || 'Send review reminder email'}
            description={t.email?.reviewReminder?.description || 'Send a reminder email if the customer hasn\'t completed their review'}
            disabled={disabled}
            icon={<Clock className="h-4 w-4 text-indigo-500" />}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotificationsTab);