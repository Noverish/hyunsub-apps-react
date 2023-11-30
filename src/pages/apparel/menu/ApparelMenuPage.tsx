import { t } from 'i18next';

import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import MenuCommonSection from 'src/components/common/menu/MenuCommonSection';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelMenuPage() {
  setDocumentTitle(t('CommonNavigation.menu'));

  return (
    <div id="ApparelMenuPage">
      <MobileHeader title={t('CommonNavigation.menu')} />
      <CommonContainer>
        <MenuCommonSection />
      </CommonContainer>
    </div>
  );
}
