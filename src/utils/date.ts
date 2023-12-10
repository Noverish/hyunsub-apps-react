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
