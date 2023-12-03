import { t } from 'i18next';

import DiaryRoutes from '../../DiaryRoutes';
import DiaryDetailHooks from '../DiaryDetailHooks';
import PhotoPreviewList from 'src/components/photo/PhotoPreviewList';
import { Diary } from 'src/model/diary';
import { PhotoPreview } from 'src/model/photo';
import router from 'src/pages/router';

import './DiaryDetailPhotoList.scss';

interface Props {
  diary: Diary;
}

export default function DiaryDetailPhotoList({ diary }: Props) {
  const { date } = DiaryDetailHooks.usePageParams();

  const itemHref = (item: PhotoPreview) => {
    return DiaryRoutes.viewer({ date, photoId: item.id });
  };

  const onClick = () => {
    router.navigate(DiaryRoutes.photo({ date }));
  };

  if (diary.photoNum === 0) {
    return <></>;
  }

  return (
    <div className="DiaryDetailPhotoList">
      <hr />
      <div className="title_container">
        <div className="title gray_on_hover" onClick={onClick}>
          {t('DiaryDetailPage.photos.title', { num: diary.photoNum })}
        </div>
        <div className="more" onClick={onClick}>
          {t('VideoHomePage.more')}
        </div>
      </div>
      <PhotoPreviewList items={diary.photos} itemHref={itemHref} />
    </div>
  );
}
