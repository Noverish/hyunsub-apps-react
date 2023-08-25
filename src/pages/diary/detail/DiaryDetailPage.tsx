import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import DiaryDetailHooks from './DiaryDetailHooks';
import DiaryDetailView from './components/DiaryDetailView';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryDetailPage() {
  setDocumentTitle(t('DiaryDetailPage.title'));

  const { diary } = DiaryDetailHooks.usePageData();
  const deleteDiary = DiaryDetailHooks.useDelete();

  const date = diary?.date;

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
        {diary ? <DiaryDetailView diary={diary} /> : <span>{t('DiaryListView.empty-msg')}</span>}
      </CommonContainer>
    </div>
  );
}
