import { t } from 'i18next';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import MenuCommonSection from 'src/components/common/menu/MenuCommonSection';
import { setDocumentTitle } from 'src/utils/services';

export default function VideoMenuPage() {
  setDocumentTitle(t('CommonNavigation.menu'));

  return (
    <div id="VideoMenuPage">
      <MobileHeader title={t('CommonNavigation.menu')} />
      <CommonContainer>
        <MenuCommonSection />
        <Link to={VideoRoutes.admin} className="mt-3 d-grid">
          <Button>Admin</Button>
        </Link>
      </CommonContainer>
    </div>
  );
}
