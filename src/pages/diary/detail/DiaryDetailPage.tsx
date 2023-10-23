import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import DiaryRoutes from '../DiaryRoutes';
import DiaryDetailHooks from './DiaryDetailHooks';
import DiaryDetailView from './components/DiaryDetailView';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';
import { setDocumentTitle } from 'src/utils/services';
import { lang } from 'src/i18n';

import './DiaryDetailPage.scss';

export default function DiaryDetailPage() {
  setDocumentTitle(t('DiaryDetailPage.title'));

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
          onClick: () => router.navigate(DiaryRoutes.modify(date)),
        },
        {
          icon: 'fas fa-trash-alt',
          onClick: () => deleteDiary(date),
        },
      ]
    : [];

  const letters = diary ? diary.content.length : '0';

  return (
    <div className="DiaryDetailPage">
      <MobileHeader title={t('DiaryDetailPage.title')} back btns={mobileHeaderBtns} />
      <CommonContainer>
        <div className="d-flex justify-content-between mb-3">
          {!query && (
            <Button variant="dark" onClick={goToYesterday}>
              <i className="fas fa-chevron-left me-2" />
              <span>{t('yesterday')}</span>
            </Button>
          )}
          <div>
            <div className="date">{date} ({weekday})</div>
            <div className="letters">{t('letters', [letters])}</div>
          </div>
          {!query && (
            <Button variant="dark" onClick={goToTomorrow}>
              <span>{t('tomorrow')}</span>
              <i className="fas fa-chevron-right ms-2" />
            </Button>
          )}
        </div>
        <LoadingSuspense isLoading={isLoading}>
          <DiaryDetailView />
        </LoadingSuspense>
      </CommonContainer>
    </div>
  );
}
