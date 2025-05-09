import { format, parseISO, subDays, startOfDay, endOfDay } from "date-fns";

export const formatDate = (date: string) => {
  if (!date) return "";
  return format(parseISO(date), "dd MMM yyyy, HH:mm");
};

export const formatTimestamp = (timestamp: number) => {
  if (!timestamp) return "";
  return format(new Date(timestamp), "dd MMM yyyy, HH:mm");
};

export const getDateFromRange = (
  range: string,
  customRange?: { startDate: Date; endDate: Date }
): [Date, Date] => {
  const now = new Date();
  const endDate = new Date(now);
  endDate.setHours(23, 59, 59, 999);

  let startDate = new Date(now);

  if (range === 'custom' && customRange) {
    console.log('getDateFromRange: Using custom date range', {
      startDate: customRange.startDate?.toISOString().split('T')[0] || 'invalid date',
      endDate: customRange.endDate?.toISOString().split('T')[0] || 'invalid date'
    });
    
    // Create new Date objects to avoid reference issues
    const start = new Date(customRange.startDate);
    start.setHours(0, 0, 0, 0); // Ensure start is at beginning of day
    
    const end = new Date(customRange.endDate);
    end.setHours(23, 59, 59, 999); // Ensure end is at end of day
    
    return [start, end];
  }

  switch (range) {
    case '1d':
      startDate.setDate(now.getDate() - 1);
      console.log('getDateFromRange: Using 1d range');
      break;
    case '7d':
      startDate.setDate(now.getDate() - 7);
      console.log('getDateFromRange: Using 7d range');
      break;
    case '30d':
      startDate.setDate(now.getDate() - 30);
      console.log('getDateFromRange: Using 30d range');
      break;
    case '6m':
      startDate.setMonth(now.getMonth() - 6);
      console.log('getDateFromRange: Using 6m range');
      break;
    case 'all':
      startDate = new Date(2000, 0, 1);
      console.log('getDateFromRange: Using all-time range');
      break;
    default:
      startDate.setDate(now.getDate() - 30);
      console.log('getDateFromRange: Using default 30d range');
  }

  startDate.setHours(0, 0, 0, 0);
  
  console.log('getDateFromRange: Calculated date range', {
    range,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    durationDays: Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
    startDateLocal: startDate.toLocaleString(),
    endDateLocal: endDate.toLocaleString()
  });
  
  return [startDate, endDate];
};