import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import { lang } from 'src/i18n';
import { Diary } from 'src/model/diary';
import DiaryDetailHooks from 'src/pages/diary/detail/DiaryDetailHooks';

interface Props {
  diary?: Diary | null;
}

export default function DiaryDetailNavigation({ diary }: Props) {
  const { date } = DiaryDetailHooks.usePageParams();

  const goToYesterday = DiaryDetailHooks.useGoToOtherDay(-1);
  const goToTomorrow = DiaryDetailHooks.useGoToOtherDay(1);

  const weekday = new Date(date).toLocaleString(lang, { weekday: 'short' });
  const letters = diary ? diary.content.length : '0';

  return (
    <div className="DiaryDetailNavigation d-flex align-items-center justify-content-between mb-3">
      <Button variant="dark" onClick={goToYesterday}>
        <i className="fas fa-chevron-left me-2" />
        <span>{t('yesterday')}</span>
      </Button>
      <div>
        <div className="date">
          {date} ({weekday})
        </div>
        <div className="letters">{t('letters', [letters])}</div>
      </div>
      <Button variant="dark" onClick={goToTomorrow}>
        <span>{t('tomorrow')}</span>
        <i className="fas fa-chevron-right ms-2" />
      </Button>
    </div>
  );
}
