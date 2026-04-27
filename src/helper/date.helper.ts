import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);

const tz = 'Asia/Ho_Chi_Minh';

export const dateHelper = (date?: string | number | Date) => dayjs(date).tz(tz);

export type SplitUnit = 'month' | 'quarter' | 'year';

export interface PeriodPart {
  start: Date;
  end: Date;
}

/**
 * Chia nhỏ 1 khoảng thời gian theo tháng / quý / năm.
 */
export function splitPeriod(
  startDate: string | Date,
  endDate: string | Date,
  unit: SplitUnit,
): PeriodPart[] {
  const result: PeriodPart[] = [];

  let start = dayjs(startDate).startOf(unit);
  const end = dayjs(endDate).endOf(unit);

  // đảm bảo start không vượt end
  if (start.isAfter(end)) return [];
  if (start.isSame(end, 'day'))
    return [
      {
        start: start.toDate(),
        end: end.toDate(),
      },
    ];

  while (start.isBefore(end, 'day')) {
    const periodStart = start;
    const periodEnd = start.endOf(unit);

    const rangeStart = periodStart.isBefore(dayjs(startDate))
      ? dayjs(startDate)
      : periodStart;
    const rangeEnd = periodEnd.isAfter(dayjs(endDate))
      ? dayjs(endDate)
      : periodEnd;

    result.push({
      start: rangeStart.toDate(),
      end: rangeEnd.toDate(),
    });

    start = start.add(1, unit).startOf(unit);
  }

  return result;
}
