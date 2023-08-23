import diarySearchApi from 'src/api/diary/diary-search';
import DiaryPreviewView from 'src/components/diary/DiaryPreviewView';

interface Props {
  query: string;
}

export default function DiaryListView({ query }: Props) {
  const { infiniteData } = diarySearchApi.useInfiniteApi({ query });

  // elements
  const elements = infiniteData.map((v) => <DiaryPreviewView key={v.date} diary={v} />);

  const emptyNotice = <div>검색 결과가 없습니다.</div>;

  return <div className="DiaryListView d-grid gap-3">{infiniteData.length > 0 ? elements : emptyNotice}</div>;
}
