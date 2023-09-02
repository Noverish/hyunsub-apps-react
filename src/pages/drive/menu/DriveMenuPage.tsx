import { t } from 'i18next';

import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import MenuCommonSection from 'src/components/common/menu/MenuCommonSection';
import { setDocumentTitle } from 'src/utils/services';

export default function DriveMenuPage() {
  setDocumentTitle(t('CommonTabBar.menu'));

  return (
    <div id="DriveMenuPage">
      <MobileHeader title={t('CommonTabBar.menu')} />
      <CommonContainer>
        <MenuCommonSection />
      </CommonContainer>
    </div>
  );
}
