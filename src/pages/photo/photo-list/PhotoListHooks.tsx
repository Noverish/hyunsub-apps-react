import { t } from 'i18next';

import PhotoRoutes from '../PhotoRoutes';
import { PhotoListContext } from './PhotoListContext';
import { PhotoSearchParams } from 'src/api/photo/photo-search';
import { useOptionalUrlParams } from 'src/hooks/url-params';
import { HeaderMoreButton, HeaderProps } from 'src/model/component';
import { PhotoSearchFormState } from 'src/pages/photo/photo-list/components/PhotoSearchForm';
import router from 'src/pages/router';
import { useContextSetter } from 'src/utils/context';

export interface PhotoListPageParams extends PhotoSearchFormState {}

function usePageParams(): PhotoListPageParams {
  const [start, end, _orphan] = useOptionalUrlParams('start', 'end', 'orphan');
  const orphan = _orphan === 'true';
  return { start, end, orphan };
}

function useSearchParams(): PhotoSearchParams {
  const { start, end, orphan } = usePageParams();

  return {
    dateRange: start && end ? { start, end } : undefined,
    orphan,
  };
}

function useHeaderProps(): HeaderProps {
  const setState = useContextSetter(PhotoListContext);

  const title = t('PhotoListPage.title');

  const moreMenu: HeaderMoreButton[] = [
    {
      icon: 'fas fa-search',
      name: t('search'),
      onClick: () => setState({ showSearchModal: true }),
    },
  ];

  return {
    title,
    menus: moreMenu,
  };
}

function useSearch() {
  const setState = useContextSetter(PhotoListContext);
  const pageParams = usePageParams();

  return (state: PhotoSearchFormState) => {
    const newPageParams = { ...pageParams, ...state };

    setState({ showSearchModal: false });

    router.navigate(PhotoRoutes.photos(newPageParams));
  };
}

const PhotoListHooks = {
  usePageParams,
  useHeaderProps,
  useSearch,
  useSearchParams,
};

export default PhotoListHooks;
