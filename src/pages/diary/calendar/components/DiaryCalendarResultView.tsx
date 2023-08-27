import { t } from 'i18next';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DiaryRoutes from '../../DiaryRoutes';
import diaryDetailApi from 'src/api/diary/diary-detail';
import DiaryPreviewView from 'src/components/diary/DiaryPreviewView';

interface Props {
  date: string;
}

export default function DiaryCalendarResultView({ date }: Props) {
  const data = diaryDetailApi.useApi({ date });

  const createUrl = DiaryRoutes.create(date);

  const content = data ? (
    <DiaryPreviewView diary={data} />
  ) : (
    <div className="d-grid gap-3">
      <span>{t('DiaryListView.empty-msg')}</span>
      <Link to={createUrl}>
        <Button>{t('DiaryCalendarPage.create')}</Button>
      </Link>
    </div>
  );

  return <div className="DiaryCalendarResultView">{content}</div>;
}
