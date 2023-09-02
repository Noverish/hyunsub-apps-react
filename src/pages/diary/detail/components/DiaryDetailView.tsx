import { t } from 'i18next';

import diaryDetailApi from 'src/api/diary/diary-detail';
import DiaryDetailHooks from 'src/pages/diary/detail/DiaryDetailHooks';

interface Props {}

export default function DiaryDetailView(props: Props) {
  const { date } = DiaryDetailHooks.usePageData();

  const diary = diaryDetailApi.useApi({ date });

  if (!diary) {
    return (
      <div className="DiaryDetailView">
        <p>{t('DiaryDetailPage.empty-msg')}</p>
      </div>
    );
  }

  const { summary, content } = diary;

  return (
    <div className="DiaryDetailView">
      <p>{summary}</p>
      <p>{content}</p>
    </div>
  );
}
