import { t } from 'i18next';

import PhotoRoutes from '../../PhotoRoutes';
import PhotoListHooks from '../PhotoListHooks';
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
  const { dateRange } = searchParams;

  const elements: JSX.Element[] = [];

  if (dateRange) {
    const onDelete = () => {
      router.navigate(
        PhotoRoutes.photos({
          ...pageParams,
          start: undefined,
          end: undefined,
        }),
      );
    };

    elements.push(
      <CommonSearchFilter key="dateRange" onDelete={onDelete}>
        {dateRange.start} ~ {dateRange.end}
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
