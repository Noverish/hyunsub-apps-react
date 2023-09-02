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

import './DiaryDetailPage.scss';

export default function DiaryDetailPage() {
  setDocumentTitle(t('DiaryDetailPage.title'));

  const { date, query } = DiaryDetailHooks.usePageData();

  const deleteDiary = DiaryDetailHooks.useDelete();
  const goToYesterday = DiaryDetailHooks.useGoToOtherDay(-1);
  const goToTomorrow = DiaryDetailHooks.useGoToOtherDay(1);

  // elements
  const mobileHeaderBtns: MobileHeaderButton[] = date
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
          <div className="date">{date}</div>
          {!query && (
            <Button variant="dark" onClick={goToTomorrow}>
              <span>{t('tomorrow')}</span>
              <i className="fas fa-chevron-right ms-2" />
            </Button>
          )}
        </div>
        <LoadingSuspense>
          <DiaryDetailView />
        </LoadingSuspense>
      </CommonContainer>
    </div>
  );
}
