import { t } from 'i18next';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';
import PhotoListView from './components/PhotoListView';

export default function PhotoListPage() {
  setDocumentTitle(t('photo.page.photo-list.title'));

  return (
    <div id="PhotoListPage">
      <MobileHeader title="Photos" />
      <CommonContainer>
        <PhotoListView />
      </CommonContainer>
    </div>
  )
}
