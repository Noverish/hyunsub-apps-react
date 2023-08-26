import { t } from 'i18next';

import DiaryPreviewView from './DiaryPreviewView';
import CommonPagination from 'src/components/common/CommonPagination';
import { Diary } from 'src/model/diary';

interface Props {
  page: number;
  total: number;
  data: Diary[];
  setPage: (page: number) => void;
}

export default function DiaryListView({ page, total, data, setPage }: Props) {
  const elements = data.map((v) => <DiaryPreviewView key={v.date} diary={v} />);

  const content =
    elements.length === 0 ? (
      <span>{t('DiaryListView.empty-msg')}</span>
    ) : (
      <>
        <CommonPagination now={page} total={total} onClick={setPage} />
        <div className="d-grid gap-3">{elements}</div>
        <CommonPagination now={page} total={total} onClick={setPage} />
      </>
    );

  return <div className="DiaryListView d-grid gap-3">{content}</div>;
}