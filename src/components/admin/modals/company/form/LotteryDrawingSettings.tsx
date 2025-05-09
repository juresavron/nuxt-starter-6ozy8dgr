import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useTranslations } from '../../../../../hooks/useTranslations';
import { cn } from '../../../../../utils/cn';

interface LotteryDrawingSettingsProps {
  drawingFrequency: string;
  drawingDay: number;
  onChange: (field: string, value: any) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

/**
 * Component for configuring lottery drawing settings
 * Only shown when coupon_type is 'lottery'
 */
const LotteryDrawingSettings: React.FC<LotteryDrawingSettingsProps> = ({
  drawingFrequency,
  drawingDay,
  onChange,
  disabled = false,
  label,
  className
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.form?.lottery || {
    drawingSettings: 'Nastavitve žrebanja',
    frequency: {
      title: 'Pogostost žrebanja',
      daily: 'Dnevno',
      weekly: 'Tedensko',
      monthly: 'Mesečno'
    },
    day: {
      title: 'Dan žrebanja',
      dayOfWeek: 'Dan v tednu',
      dayOfMonth: 'Dan v mesecu'
    },
    days: {
      sunday: 'Nedelja',
      monday: 'Ponedeljek',
      tuesday: 'Torek',
      wednesday: 'Sreda',
      thursday: 'Četrtek',
      friday: 'Petek',
      saturday: 'Sobota'
    },
    description: 'Nastavite, kdaj se izvaja žrebanje za nagrade. Sistem bo samodejno izbral naključnega zmagovalca med vsemi sodelujočimi.'
  };

  // Generate options for day selection based on frequency
  const getDayOptions = () => {
    if (drawingFrequency === 'weekly') {
      return [
        { value: 0, label: t.days?.sunday || 'Nedelja' },
        { value: 1, label: t.days?.monday || 'Ponedeljek' },
        { value: 2, label: t.days?.tuesday || 'Torek' },
        { value: 3, label: t.days?.wednesday || 'Sreda' },
        { value: 4, label: t.days?.thursday || 'Četrtek' },
        { value: 5, label: t.days?.friday || 'Petek' },
        { value: 6, label: t.days?.saturday || 'Sobota' }
      ];
    } else if (drawingFrequency === 'monthly') {
      return Array.from({ length: 31 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}.`
      }));
    }
    return [];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>{label || t.drawingSettings || "Nastavitve žrebanja"}</span>
        </div>
      </label>
      
      <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100/50">
        <p className="text-xs text-gray-600 mb-4">
          {t.description || "Nastavite, kdaj se izvaja žrebanje za nagrade. Sistem bo samodejno izbral naključnega zmagovalca med vsemi sodelujočimi."}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Frequency selection */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {t.frequency?.title || "Pogostost žrebanja"}
            </label>
            <select
              value={drawingFrequency}
              onChange={(e) => onChange('lottery_drawing_frequency', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              disabled={disabled}
            >
              <option value="daily">{t.frequency?.daily || "Dnevno"}</option>
              <option value="weekly">{t.frequency?.weekly || "Tedensko"}</option>
              <option value="monthly">{t.frequency?.monthly || "Mesečno"}</option>
            </select>
          </div>
          
          {/* Day selection (only for weekly and monthly) */}
          {drawingFrequency !== 'daily' && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {drawingFrequency === 'weekly' 
                  ? (t.day?.dayOfWeek || "Dan v tednu") 
                  : (t.day?.dayOfMonth || "Dan v mesecu")}
              </label>
              <select
                value={drawingDay}
                onChange={(e) => onChange('lottery_drawing_day', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={disabled}
              >
                {getDayOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-xs text-blue-600">
          <Clock className="h-4 w-4" />
          <span>
            {drawingFrequency === 'daily' 
              ? 'Žrebanje se izvaja vsak dan ob polnoči.' 
              : drawingFrequency === 'weekly'
                ? `Žrebanje se izvaja vsak teden v ${getDayOptions().find(d => d.value === drawingDay)?.label || 'izbrani dan'}.`
                : `Žrebanje se izvaja vsak mesec ${drawingDay}. dan.`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LotteryDrawingSettings);