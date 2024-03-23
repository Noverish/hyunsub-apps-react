import { t } from 'i18next';
import { useContext } from 'react';

import PhotoRoutes from '../PhotoRoutes';
import { PhotoListContext } from './PhotoListContext';
import photoDeleteBulkApi from 'src/api/photo/photo-delete-bulk';
import { PhotoSearchParams } from 'src/api/photo/photo-search';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import PhotoSelectHeaderHooks from 'src/components/photo/photo-list/PhotoSelectHeaderHooks';
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

function useDelete() {
  const [{ selects }, setState] = useContext(PhotoSelectContext);
  const cnt = selects.length;

  return async () => {
    if (!window.confirm(t('photo.msg.photo-delete-confirm', { cnt }))) {
      return;
    }

    const photoIds = selects.map((v) => v.id);

    await photoDeleteBulkApi({ photoIds });

    setState({ selectMode: false });
  };
}

function useHeaderProps(): HeaderProps {
  const setPageState = useContextSetter(PhotoListContext);
  const [{ selectMode }, setSelectState] = useContext(PhotoSelectContext);

  const onDelete = useDelete();

  const headerPropsOnSelect = PhotoSelectHeaderHooks.useHeaderProps2(onDelete);

  if (selectMode) {
    return headerPropsOnSelect;
  }

  const title = t('PhotoListPage.title');

  const moreMenu: HeaderMoreButton[] = [
    {
      icon: 'fas fa-search',
      name: t('search'),
      onClick: () => setPageState({ showSearchModal: true }),
    },
    {
      icon: 'fas fa-trash',
      name: t('delete'),
      onClick: () => setSelectState({ selectMode: true }),
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
