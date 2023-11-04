import { t } from 'i18next';

import VideoSearchHooks from './VideoSearchHooks';
import VideoSearchResultView from './components/VideoSearchResultView';
import videoSearchApi from 'src/api/video/video-search';
import { Loading } from 'src/components/common/LoadingSuspense';
import SearchInput from 'src/components/common/SearchInput';
import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function VideoSearchPage() {
  const { query, setQuery } = VideoSearchHooks.usePageParams();

  const { data, isFetching } = videoSearchApi.useApiResult({ query }, { enabled: !!query });

  return (
    <CommonLayout className="VideoSearchPage" title={t('VideoSearchPage.title')}>
      <SearchInput className="mb-3" defaultQuery={query} onSubmit={setQuery} />
      {isFetching && <Loading />}
      {data && <VideoSearchResultView result={data} query={query} />}
    </CommonLayout>
  );
}
