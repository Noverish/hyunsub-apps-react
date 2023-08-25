import { t } from 'i18next';

import diaryDetailApi from 'src/api/diary/diary-detail';
import DiaryPreviewView from 'src/components/diary/DiaryPreviewView';

interface Props {
  date: string;
}

export default function DiaryCalendarResultView({ date }: Props) {
  const data = diaryDetailApi.useApi({ date });

  return (
    <div className="DiaryCalendarResultView">
      {data ? <DiaryPreviewView diary={data} /> : <span>{t('DiaryListView.empty-msg')}</span>}
    </div>
  );
}
