import { t } from 'i18next';

import DiaryPreviewView from './DiaryPreviewView';
import CommonPagination from 'src/components/common/CommonPagination';
import { PageData } from 'src/model/api';
import { DiaryPreview } from 'src/model/diary';

interface Props {
  pageData: PageData<DiaryPreview>;
  setPage: (page: number) => void;
  query?: string;
}

export default function DiaryListView({ pageData, setPage, query }: Props) {
  const { data, page, total, pageSize } = pageData;

  const elements = data.map((v) => <DiaryPreviewView key={v.date} diary={v} query={query} />);

  const totalPage = Math.floor((total - 1) / pageSize) + 1;

  const content =
    elements.length === 0 ? (
      <span>{t('DiaryListView.empty-msg')}</span>
    ) : (
      <>
        <CommonPagination now={page} total={totalPage} onClick={setPage} />
        <div className="d-grid gap-3">{elements}</div>
        <CommonPagination now={page} total={totalPage} onClick={setPage} />
      </>
    );

  return <div className="DiaryListView d-grid gap-3">{content}</div>;
}
