import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import DiaryRoutes from '../DiaryRoutes';
import DiaryDetailHooks from './DiaryDetailHooks';
import DiaryDetailView from './components/DiaryDetailView';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { lang } from 'src/i18n';
import router from 'src/pages/router';

import './DiaryDetailPage.scss';

export default function DiaryDetailPage() {
  const { date, query, isLoading, diary } = DiaryDetailHooks.usePageData();
  const weekday = new Date(date).toLocaleString(lang, { weekday: 'short' });

  const deleteDiary = DiaryDetailHooks.useDelete();
  const goToYesterday = DiaryDetailHooks.useGoToOtherDay(-1);
  const goToTomorrow = DiaryDetailHooks.useGoToOtherDay(1);

  // elements
  const mobileHeaderBtns: MobileHeaderButton[] = diary
    ? [
        {
          icon: 'fas fa-edit',
          name: t('edit'),
          onClick: () => router.navigate(DiaryRoutes.update(date)),
        },
        {
          icon: 'fas fa-trash-alt',
          name: t('delete'),
          onClick: () => deleteDiary(date),
        },
      ]
    : [];

  const letters = diary ? diary.content.length : '0';

  return (
    <CommonLayout className="DiaryDetailPage" title={t('DiaryDetailPage.title')} btns={mobileHeaderBtns} back>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          {!query && (
            <Button variant="dark" onClick={goToYesterday}>
              <i className="fas fa-chevron-left me-2" />
              <span>{t('yesterday')}</span>
            </Button>
          )}
        </div>
        <div>
          <div className="date">
            {date} ({weekday})
          </div>
          <div className="letters">{t('letters', [letters])}</div>
        </div>
        <div>
          {!query && (
            <Button variant="dark" onClick={goToTomorrow}>
              <span>{t('tomorrow')}</span>
              <i className="fas fa-chevron-right ms-2" />
            </Button>
          )}
        </div>
      </div>
      <LoadingSuspense isLoading={isLoading}>
        <DiaryDetailView />
      </LoadingSuspense>
    </CommonLayout>
  );
}
