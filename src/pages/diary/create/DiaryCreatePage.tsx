import { t } from 'i18next';

import DiaryCreateHooks from './DiaryCreateHooks';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DiaryForm from 'src/components/diary/DiaryForm';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryCreatePage() {
  setDocumentTitle(t('DiaryCreatePage.title'));

  const { date } = DiaryCreateHooks.usePageData();
  const create = DiaryCreateHooks.useCreate();

  return (
    <div className="DiaryCreatePage">
      <MobileHeader title={t('DiaryCreatePage.title')} back />
      <CommonContainer>
        <DiaryForm onComplete={create} initialDate={date || undefined} />
      </CommonContainer>
    </div>
  );
}
