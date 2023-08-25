import { t } from 'i18next';

import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DiaryForm from 'src/components/diary/DiaryForm';
import DiaryModifyHooks from 'src/pages/diary/modify/DiaryModifyHooks';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryModifyPage() {
  setDocumentTitle(t('DiaryModifyPage.title'));

  const { diary } = DiaryModifyHooks.usePageData();

  const modify = DiaryModifyHooks.useModify();

  return (
    <div className="DiaryModifyPage">
      <MobileHeader title={t('DiaryModifyPage.title')} back />
      <CommonContainer>
        {diary ? <DiaryForm diary={diary} onComplete={modify} /> : <span>{t('DiaryListView.empty-msg')}</span>}
      </CommonContainer>
    </div>
  );
}
