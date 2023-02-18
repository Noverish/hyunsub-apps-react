import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import comicDetailApi from 'src/api/comic/comic-detail';
import ComicEpisodeView from 'src/components/comic/ComicEpisodeView';
import ComicHeader from 'src/components/comic/ComicHeader';
import CommonContainer from 'src/components/common/header/CommonContainer';
import { setDocumentTitle } from 'src/utils/services';

export default function ComicDetailPage() {
  const { t } = useTranslation();
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
      <ComicHeader title={comicDetail.title} back />
      <CommonContainer>
        <h3>{t('comic.ComicDetailPage.subtitle', [comicDetail.episodes.length])}</h3>
        {elements}
      </CommonContainer>
    </div>
  )
}
