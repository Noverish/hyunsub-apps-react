import { t } from 'i18next';

import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DiaryForm from 'src/components/diary/DiaryForm';
import DiaryUpdateHooks from 'src/pages/diary/update/DiaryUpdateHooks';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryUpdatePage() {
  setDocumentTitle(t('DiaryUpdatePage.title'));

  const { diary } = DiaryUpdateHooks.usePageData();

  const update = DiaryUpdateHooks.useUpdate();

  return (
    <div className="DiaryUpdatePage">
      <MobileHeader title={t('DiaryUpdatePage.title')} back />
      <CommonContainer>
        {diary ? <DiaryForm diary={diary} onComplete={update} /> : <span>{t('DiaryListView.empty-msg')}</span>}
      </CommonContainer>
    </div>
  );
}
