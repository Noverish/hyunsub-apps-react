import CommonContainer from 'src/components/common/header/CommonContainer';
import MenuCommonSection from 'src/components/common/menu/MenuCommonSection';
import PhotoHeader from 'src/components/photo/PhotoHeader';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { setDocumentTitle } from 'src/utils/services';

export default function PhotoMenuPage() {
  const { t } = useTranslation();

  useEffect(() => {
    setDocumentTitle(t('CommonTabBar.menu'));
  }, [t]);

  return (
    <div id="PhotoMenuPage">
      <PhotoHeader title={t('CommonTabBar.menu')} />
      <CommonContainer>
        <MenuCommonSection />
      </CommonContainer>
    </div>
  )
}
