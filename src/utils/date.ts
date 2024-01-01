import { DateTime } from 'luxon';

import { lang } from 'src/i18n';

export function toLocaleString(dateStr: string | undefined): string {
  if (!dateStr) {
    return '';
  }

  const isLocalDate = dateStr.includes(' ');

  const date = isLocalDate ? DateTime.fromSQL(dateStr) : DateTime.fromISO(dateStr, { setZone: true });

  const result = date.setLocale(lang).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

  return isLocalDate ? result : result + ' ' + date.toFormat('z');
}

export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function toDateTimeString(date: Date): string {
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${toDateString(date)} ${hour}:${minute}:${second}`;
}
