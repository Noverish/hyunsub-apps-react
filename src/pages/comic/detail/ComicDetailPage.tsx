import { t } from 'i18next';

import ComicDetailHooks from './ComicDetailHooks';
import comicDetailApi from 'src/api/comic/comic-detail';
import ComicEpisodeView from 'src/components/comic/ComicEpisodePreviewItem';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function ComicDetailPage() {
  const { comicId } = ComicDetailHooks.usePageParams();

  const { data } = comicDetailApi.useApiResult({ comicId });
  const title = data?.title ?? '';
  const episodes = data?.episodes ?? [];

  const elements = episodes.map((v) => <ComicEpisodeView key={v.order} comicId={comicId} episode={v} />);

  return (
    <CommonLayout className="ComicDetailPage" title={title} back>
      <h3>{t('comic.ComicDetailPage.subtitle', [data ? episodes.length : '000'])}</h3>
      {data ? elements : <Loading />}
    </CommonLayout>
  );
}
