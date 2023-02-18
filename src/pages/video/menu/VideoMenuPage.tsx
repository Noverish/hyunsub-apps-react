import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MenuCommonSection from 'src/components/common/menu/MenuCommonSection';
import VideoHeader from 'src/components/video/VideoHeader';
import { setDocumentTitle } from 'src/utils/services';

export default function VideoMenuPage() {
  const { t } = useTranslation();

  useEffect(() => {
    setDocumentTitle(t('CommonTabBar.menu'))
  }, [t]);

  return (
    <div id="VideoMenuPage">
      <VideoHeader title={t('CommonTabBar.menu')} />
      <CommonContainer>
        <MenuCommonSection />
      </CommonContainer>
    </div>
  )
}
