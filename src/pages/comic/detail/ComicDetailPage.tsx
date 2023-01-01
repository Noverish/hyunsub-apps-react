import { Base64 } from 'js-base64';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import comicDetailApi from 'src/api/comic/comic-detail';
import ComicEpisodeView from 'src/components/comic/ComicEpisodeView';
import ComicHeader from 'src/components/comic/ComicHeader';
import CommonContainer from 'src/components/common/header/CommonContainer';

export default function ComicDetailPage() {
  const { t } = useTranslation();
  const name = Base64.decode(useParams().name as string);

  const comic = comicDetailApi.useApi({ name });

  const elements = comic.episodes.map(v => (
    <ComicEpisodeView name={name} episode={v} />
  ))

  return (
    <div className="ComicDetailPage">
      <ComicHeader title={name} back />
      <CommonContainer>
        <h3>{t('comic.ComicDetailPage.subtitle', [comic.episodes.length])}</h3>
        {elements}
      </CommonContainer>
    </div>
  )
}
