import { t } from 'i18next';

import comicListApi from 'src/api/comic/comic-list';
import ComicPreviewList from 'src/components/comic/ComicPreviewList';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function ComicListPage() {
  const { data } = comicListApi.useApiResult({});

  return (
    <CommonLayout className="ComicListPage" title={t('comic.ComicListPage.title')}>
      {data ? <ComicPreviewList previews={data} /> : <Loading />}
    </CommonLayout>
  );
}
