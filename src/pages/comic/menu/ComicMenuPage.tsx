import { t } from 'i18next';
import { useEffect } from 'react';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import MenuCommonSection from 'src/components/common/menu/MenuCommonSection';
import { setDocumentTitle } from 'src/utils/services';

export default function ComicMenuPage() {
  useEffect(() => {
    setDocumentTitle(t('CommonTabBar.menu'));
  }, []);

  return (
    <div id="ComicMenuPage">
      <MobileHeader title={t('CommonTabBar.menu')} />
      <CommonContainer>
        <MenuCommonSection />
      </CommonContainer>
    </div>
  )
}
