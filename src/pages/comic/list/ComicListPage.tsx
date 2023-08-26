import { t } from 'i18next';
import { useEffect } from 'react';

import comicListApi from 'src/api/comic/comic-list';
import ComicPreviewView from 'src/components/comic/ComicPreviewView';
import ComicTabBar from 'src/components/comic/header/ComicTabBar';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';

export default function ComicListPage() {
  useEffect(() => {
    setDocumentTitle(t('comic.ComicListPage.title'));
  }, []);

  const comics = comicListApi.useApi({});

  const elements = comics.map((v) => <ComicPreviewView key={v.id} comic={v} />);

  return (
    <div className="ComicListPage">
      <MobileHeader title={t('comic.ComicListPage.title')} />
      <ComicTabBar />
      <CommonContainer>
        <div className="d-grid gap-2 gap-md-3 row-col-3 row-col-md-4 row-col-xl-6">{elements}</div>
      </CommonContainer>
    </div>
  );
}
