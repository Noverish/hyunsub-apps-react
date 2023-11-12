import { t } from 'i18next';

import DiaryCreateHooks from './DiaryCreateHooks';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DiaryForm from 'src/components/diary/DiaryForm';
import { useOptionalUrlParams } from 'src/hooks/url-params';

export default function DiaryCreatePage() {
  const [date] = useOptionalUrlParams('date');
  const create = DiaryCreateHooks.useCreate();

  return (
    <CommonLayout className="DiaryCreatePage" title={t('DiaryCreatePage.title')} back>
      <DiaryForm onComplete={create} initialDate={date || undefined} />
    </CommonLayout>
  );
}
