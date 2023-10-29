import dayjs from 'dayjs';
import moment from 'moment';
import { DATE_FORMATS } from '../constants';

export const isNullOrUndefined = (value?: unknown): boolean => {
  return value === undefined || value === null;
};

export const formatCurrency = (value: number): string => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ';

export const formatNumber = (value: number | string, suffix?: string): string =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (suffix || '');

export const formatDateTime = (timeString?: Date | string): string => {
  if (isNullOrUndefined(timeString)) return '';
  return dayjs(timeString).format(DATE_FORMATS.DD_MM_YYYY);
};

export const timeForNotification = (timeString?: string): string => {
  if (isNullOrUndefined(timeString)) return '';
  if (dayjs(timeString).isAfter(dayjs(new Date()).add(-1, 'day'))) return moment(timeString).fromNow().split(' ago')[0];
  if (dayjs(timeString).isAfter(dayjs(new Date()).add(-1, 'year'))) return moment(timeString).format('YYYY-MM-DD');
  return dayjs(timeString).format(DATE_FORMATS.DD_MM);
};

export const formatMillion = (num: number): string => {
  return Math.abs(Math.floor(Number(num) / 1.0e6)) + ' Triệu';
};

export const countSeconds = (startDate: string): number => {
  if (startDate === '' || isNullOrUndefined(startDate)) return 0;
  const now = new Date();
  const _startDate = new Date(startDate);
  if (_startDate > now) return 0;
  if (_startDate.getMonth() < now.getMonth() || _startDate.getFullYear() < now.getFullYear()) {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return Math.floor((now.getTime() - monthStart.getTime()) / 1000);
  }
  return Math.floor((now.getTime() - _startDate.getTime()) / 1000);
};
