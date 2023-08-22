import { t } from 'i18next';

import DiaryCreateHooks from './DiaryCreateHooks';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DiaryForm from 'src/components/diary/DiaryForm';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryCreatePage() {
  setDocumentTitle(t('DiaryCreatePage.title'));

  const create = DiaryCreateHooks.useCreate();

  return (
    <div className="DiaryCreatePage">
      <MobileHeader title={t('DiaryCreatePage.title')} />
      <CommonContainer>
        <DiaryForm onComplete={create} />
      </CommonContainer>
    </div>
  );
}
