import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PhotoHeader from 'src/components/photo/PhotoHeader';

export default function PhotoListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('photo.page.photo-list.title');
  }, [t]);

  return (
    <div id="PhotoListPage">
      <PhotoHeader title="Photos" />
      <Container id="content" className="with_tab_bar">

      </Container>
    </div>
  )
}
