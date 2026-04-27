import dayjs, { OptionType } from 'dayjs';

export const createDate = (day?: string | Date, format?: OptionType) =>
  dayjs(day, format);
