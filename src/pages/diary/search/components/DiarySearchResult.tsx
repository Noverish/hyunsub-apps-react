import diarySearchApi from 'src/api/diary/diary-search';
import CommonSearchResult from 'src/components/common/search/CommonSearchResult';
import DiaryPreviewItem from 'src/components/diary/DiaryPreviewItem';
import { DiaryPreview } from 'src/model/diary';

interface Props {
  ignoreQuery?: boolean;
}

export default function DiarySearchResult({ ignoreQuery }: Props) {
  return (
    <CommonSearchResult
      searchFn={({ page, query }) => diarySearchApi.useApiResult({ page, query: ignoreQuery ? undefined : query })}
      renderItem={renderItem}
      renderTotal={!ignoreQuery}
    />
  );
}

function renderItem(v: DiaryPreview, query: string) {
  return <DiaryPreviewItem key={v.date} diary={v} query={query} />;
}
