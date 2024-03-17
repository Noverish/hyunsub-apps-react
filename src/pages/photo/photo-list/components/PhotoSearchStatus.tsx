import PhotoRoutes from '../../PhotoRoutes';
import PhotoListHooks from '../PhotoListHooks';
import CommonSearchFilter from 'src/components/common/search/CommonSearchFilter';
import router from 'src/pages/router';

interface Props {}

export default function PhotoSearchStatus(props: Props) {
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

  return <div className="PhotoSearchStatus mb-3">{elements}</div>;
}
