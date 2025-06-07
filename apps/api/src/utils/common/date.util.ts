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

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
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
  defaultDays: number = 30,
): DateMatchStage {
  const matchStage: DateMatchStage = {};

  if (!from && !to && defaultDays) {
    const toDate = new Date();
    toDate.setHours(23, 59, 59, 999);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - defaultDays);
    fromDate.setHours(0, 0, 0, 0);

    matchStage[key] = {
      $gte: fromDate,
      $lte: toDate,
    };

    return matchStage;
  }

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

export function fillMissingDates<T extends Record<string, any>>(
  data: T[],
  from?: string,
  to?: string,
  defaultDays: number = 30,
  dateKey: string = 'date',
  metrics: string[] = ['count'],
): T[] {
  let startDate: Date, endDate: Date;

  if (from && to) {
    startDate = new Date(from);
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999);
  } else {
    endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    startDate = new Date();
    startDate.setDate(endDate.getDate() - defaultDays);
    startDate.setHours(0, 0, 0, 0);
  }

  const dataMap: Record<string, T> = {};
  data.forEach((item) => {
    const dateValue = item[dateKey];
    if (dateValue && typeof dateValue === 'string') {
      dataMap[dateValue] = item;
    }
  });

  const result: T[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const formattedDate = formatDate(dateStr);

    let existingData: T | undefined = undefined;

    if (dateStr && typeof dateStr === 'string') {
      existingData = dataMap[dateStr];
    }

    if (!existingData && formattedDate && typeof formattedDate === 'string') {
      existingData = dataMap[formattedDate];
    }

    if (existingData) {
      result.push(existingData);
    } else {
      const newEntry: Record<string, any> = {};
      newEntry[dateKey] = formattedDate;

      metrics.forEach((metric) => {
        newEntry[metric] = 0;
      });

      result.push(newEntry as T);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}
