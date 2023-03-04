import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import MenuCommonSection from 'src/components/common/menu/MenuCommonSection';
import { setDocumentTitle } from 'src/utils/services';

export default function PhotoMenuPage() {
  const { t } = useTranslation();

  useEffect(() => {
    setDocumentTitle(t('CommonTabBar.menu'));
  }, [t]);

  return (
    <div id="PhotoMenuPage">
      <MobileHeader title={t('CommonTabBar.menu')} />
      <CommonContainer>
        <MenuCommonSection />
      </CommonContainer>
    </div>
  )
}
