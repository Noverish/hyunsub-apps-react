import DiaryListHooks from '../DiaryListHooks';
import diarySearchApi from 'src/api/diary/diary-search';
import CommonPagination from 'src/components/common/CommonPagination';
import DiaryPreviewView from 'src/components/diary/DiaryPreviewView';

export default function DiaryListView() {
  const { page, query, setPage } = DiaryListHooks.usePageData();
  const { total, data } = diarySearchApi.useApi({ page, query });

  // elements
  if (data.length === 0) {
    return <div className="DiaryListView">검색 결과가 없습니다.</div>;
  }

  const elements = data.map((v) => <DiaryPreviewView key={v.date} diary={v} />);

  return (
    <div className="DiaryListView d-grid gap-3">
      <CommonPagination now={page} total={total} onClick={setPage} />
      <div className="d-grid gap-3">{elements}</div>
      <CommonPagination now={page} total={total} onClick={setPage} />
    </div>
  );
}
