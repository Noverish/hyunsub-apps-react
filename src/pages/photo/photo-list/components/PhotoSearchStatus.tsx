import { t } from 'i18next';

import PhotoRoutes from '../../PhotoRoutes';
import PhotoListHooks, { PhotoListPageParams } from '../PhotoListHooks';
import CommonSearchFilter from 'src/components/common/search/CommonSearchFilter';
import router from 'src/pages/router';

import './PhotoSearchStatus.scss';

interface Props {
  total: number;
}

export default function PhotoSearchStatus(props: Props) {
  const { total } = props;

  const searchParams = PhotoListHooks.useSearchParams();
  const pageParams = PhotoListHooks.usePageParams();
  const { dateRange, orphan } = searchParams;

  const generateOnDelete = (updater: (params: PhotoListPageParams) => PhotoListPageParams) => () => {
    const newParams = updater(pageParams);
    router.navigate(PhotoRoutes.photos(newParams));
  };

  const elements: JSX.Element[] = [];

  if (dateRange) {
    const onDelete = generateOnDelete((v) => ({ ...v, start: undefined, end: undefined }));

    elements.push(
      <CommonSearchFilter key="dateRange" onDelete={onDelete}>
        {dateRange.start} ~ {dateRange.end}
      </CommonSearchFilter>,
    );
  }

  if (orphan) {
    const onDelete = generateOnDelete((v) => ({ ...v, orphan: undefined }));

    elements.push(
      <CommonSearchFilter key="orphan" onDelete={onDelete}>
        {t('PhotoSearchForm.orphan')}
      </CommonSearchFilter>,
    );
  }

  return (
    <div className="PhotoSearchStatus mb-3">
      <div className="photo_num">{t('AlbumInfoView.photo-num', [total ?? 0])}</div>
      <div className="middot" />
      <div>{elements}</div>
    </div>
  );
}
