import { t } from 'i18next';

import DiaryPreviewList from 'src/components/diary/DiaryPreviewList';
import { PageData } from 'src/model/api';
import { DiaryPreview } from 'src/model/diary';
import DiarySearchHooks from 'src/pages/diary/search/DiarySearchHooks';

interface Props {
  pageData: PageData<DiaryPreview>;
}

export default function DiarySearchResult({ pageData }: Props) {
  const { query, setPage } = DiarySearchHooks.usePageParams();

  return (
    <div>
      <h3>{t('DiarySearchPage.result-num', [pageData.total])}</h3>
      <DiaryPreviewList pageData={pageData} setPage={setPage} query={query} />
    </div>
  );
}
