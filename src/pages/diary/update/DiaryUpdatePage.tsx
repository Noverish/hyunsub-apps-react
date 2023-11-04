import { t } from 'i18next';

import CommonLayout from 'src/components/common/layout/CommonLayout';
import DiaryForm from 'src/components/diary/DiaryForm';
import DiaryUpdateHooks from 'src/pages/diary/update/DiaryUpdateHooks';

export default function DiaryUpdatePage() {
  const { diary } = DiaryUpdateHooks.usePageData();
  const update = DiaryUpdateHooks.useUpdate();

  return (
    <CommonLayout className="DiaryUpdatePage" title={t('DiaryUpdatePage.title')} back>
      {diary ? <DiaryForm diary={diary} onComplete={update} /> : <span>{t('DiaryListView.empty-msg')}</span>}
    </CommonLayout>
  );
}
