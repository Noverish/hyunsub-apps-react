import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import DiaryRoutes from '../DiaryRoutes';
import DiaryDetailHooks from './DiaryDetailHooks';
import DiaryDetailView from './components/DiaryDetailView';
import diaryDetailApi from 'src/api/diary/diary-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { lang } from 'src/i18n';
import router from 'src/pages/router';

import './DiaryDetailPage.scss';

export default function DiaryDetailPage() {
  const { date } = DiaryDetailHooks.usePageParams();
  const { data, isLoading } = diaryDetailApi.useApiResult({ date });

  // functions
  const remove = DiaryDetailHooks.useDelete();
  const goToYesterday = DiaryDetailHooks.useGoToOtherDay(-1);
  const goToTomorrow = DiaryDetailHooks.useGoToOtherDay(1);

  // elements
  const mobileHeaderBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-edit',
      name: t('edit'),
      onClick: () => router.navigate(DiaryRoutes.update(date)),
    },
    {
      icon: 'fas fa-trash-alt',
      name: t('delete'),
      onClick: () => (data ? remove(date) : undefined),
    },
  ];

  const weekday = new Date(date).toLocaleString(lang, { weekday: 'short' });
  const letters = data ? data.content.length : '0';

  return (
    <CommonLayout
      className="DiaryDetailPage"
      title={t('DiaryDetailPage.title')}
      btns={data ? mobileHeaderBtns : undefined}
      back
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
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
      {isLoading ? <Loading /> : <DiaryDetailView diary={data} />}
    </CommonLayout>
  );
}
