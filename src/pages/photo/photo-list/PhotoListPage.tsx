import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';

export default function PhotoListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    setDocumentTitle(t('photo.page.photo-list.title'));
  }, [t]);

  return (
    <div id="PhotoListPage">
      <MobileHeader title="Photos" />
      <CommonContainer>

      </CommonContainer>
    </div>
  )
}
