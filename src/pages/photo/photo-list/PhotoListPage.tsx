import { t } from 'i18next';
import { useContext } from 'react';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';
import PhotoListView from './components/PhotoListView';
import { PhotoListContext, PhotoListProvider } from './PhotoListState';

function PhotoListPage() {
  setDocumentTitle(t('photo.page.photo-list.title'));

  const [state, setState] = useContext(PhotoListContext);
  const { selectMode, selects } = state;
  const title = selectMode ? t('n-selected', [selects.length]) : 'Photos';

  const headerBtns: MobileHeaderButton[] = [
    {
      text: selectMode ? t('cancel') : t('select'),
      onClick: () => setState({ selectMode: !selectMode }),
    }
  ]

  return (
    <div id="PhotoListPage">
      <MobileHeader title={title} btns={headerBtns} />
      <CommonContainer>
        <PhotoListView />
      </CommonContainer>
    </div>
  )
}

export default function PhotoListIndex() {
  return (
    <PhotoListProvider>
      <PhotoListPage />
    </PhotoListProvider>
  )
}
