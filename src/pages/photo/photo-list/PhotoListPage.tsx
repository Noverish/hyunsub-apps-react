import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CommonContainer from 'src/components/common/header/CommonContainer';
import PhotoHeader from 'src/components/photo/PhotoHeader';
import { setDocumentTitle } from 'src/utils/services';

export default function PhotoListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    setDocumentTitle(t('photo.page.photo-list.title'));
  }, [t]);

  return (
    <div id="PhotoListPage">
      <PhotoHeader title="Photos" />
      <CommonContainer>

      </CommonContainer>
    </div>
  )
}
