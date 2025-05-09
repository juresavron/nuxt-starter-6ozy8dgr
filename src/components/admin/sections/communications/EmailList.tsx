import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, CheckCircle, AlertCircle, User, Building2 } from 'lucide-react';
import Card from '../../../shared/Card';
import { formatDate } from '../../../../utils/date';
import { useTranslations } from '../../../../hooks/useTranslations';
import type { EmailLog } from './types';

interface EmailListProps {
  emails: EmailLog[];
  loading: boolean;
}

/**
 * Component for displaying a list of sent emails
 */
const EmailList: React.FC<EmailListProps> = ({
  emails,
  loading
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.communications || {};

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600">{t?.loading || 'Loading emails...'}</p>
      </div>
    );
  }

  if (!emails || emails.length === 0) {
    return (
      <Card>
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t?.noEmails || 'No emails found'}</h3>
          <p className="text-gray-500">
            {t?.noEmailsMessage || 'No emails have been sent yet.'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {emails.map((email, index) => (
        <motion.div
          key={email.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{email.subject}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(email.sent_at)}
                      {email.status === 'delivered' ? (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {t?.delivered || 'Delivered'}
                        </span>
                      ) : email.status === 'failed' ? (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {t?.failed || 'Failed'}
                        </span>
                      ) : (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {email.status || 'Unknown'}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t?.recipient || 'Recipient'}</p>
                    <p className="text-gray-900">{email.recipient}</p>
                  </div>
                </div>
                
                {email.company_name && (
                  <div className="flex items-start gap-2">
                    <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t?.company || 'Company'}</p>
                      <p className="text-gray-900">{email.company_name}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t?.emailType || 'Email Type'}</p>
                    <p className="text-gray-900">{email.template_name || 'General'}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default React.memo(EmailList);