import { DateMatchStage } from './interfaces/date';

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export function getDateMatchStage(
  key: string,
  from?: string,
  to?: string,
): DateMatchStage {
  const matchStage: DateMatchStage = {};

  if (from || to) {
    const dateCondition: DateMatchStage[keyof DateMatchStage] = {};

    if (from) {
      const fromDate = new Date(from);
      fromDate.setHours(0, 0, 0, 0);
      dateCondition.$gte = fromDate;
    }

    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      dateCondition.$lte = toDate;
    }

    matchStage[key] = dateCondition;
  }

  return matchStage;
}
