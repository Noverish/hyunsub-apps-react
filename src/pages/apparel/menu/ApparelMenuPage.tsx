import ApparelHeader from 'src/components/apparel/ApparelHeader';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MenuCommonSection from 'src/components/common/menu/MenuCommonSection';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelMenuPage() {
  const { t } = useTranslation();

  useEffect(() => {
    setDocumentTitle(t('CommonTabBar.menu'));
  }, [t]);

  return (
    <div id="ApparelMenuPage">
      <ApparelHeader title={t('CommonTabBar.menu')} />
      <CommonContainer>
        <MenuCommonSection />
      </CommonContainer>
    </div>
  )
}
