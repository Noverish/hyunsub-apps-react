import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import DiaryDetailHooks from './DiaryDetailHooks';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryDetailPage() {
  setDocumentTitle(t('DiaryDetailPage.title'));

  const { diary } = DiaryDetailHooks.usePageData();
  const deleteDiary = DiaryDetailHooks.useDelete();

  const date = diary.date;

  // elements
  const summaryElement = diary.summary ? <p>{diary.summary}</p> : undefined;

  const mobileHeaderBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-edit',
      onClick: () => router.navigate(DiaryRoutes.modify(date)),
    },
    {
      icon: 'fas fa-trash-alt',
      onClick: () => deleteDiary(date),
    },
  ];

  return (
    <div className="DiaryDetailPage">
      <MobileHeader title={t('DiaryDetailPage.title')} back btns={mobileHeaderBtns} />
      <CommonContainer>
        <h1>{date}</h1>
        {summaryElement}
        <p>{diary.content}</p>
      </CommonContainer>
    </div>
  );
}
