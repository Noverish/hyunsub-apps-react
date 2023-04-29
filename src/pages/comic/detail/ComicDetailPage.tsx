import { t } from 'i18next';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import comicDetailApi from 'src/api/comic/comic-detail';
import ComicEpisodeView from 'src/components/comic/ComicEpisodeView';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';

export default function ComicDetailPage() {
  const comicId = useParams().comicId!;

  const comicDetail = comicDetailApi.useApi({ comicId });

  useEffect(() => {
    setDocumentTitle(comicDetail.title);
  }, [comicDetail.title]);

  const elements = comicDetail.episodes.map(v => (
    <ComicEpisodeView key={v.order} comicId={comicDetail.id} episode={v} />
  ))

  return (
    <div className="ComicDetailPage">
      <MobileHeader title={comicDetail.title} back />
      <CommonContainer>
        <h3>{t('comic.ComicDetailPage.subtitle', [comicDetail.episodes.length])}</h3>
        {elements}
      </CommonContainer>
    </div>
  )
}
