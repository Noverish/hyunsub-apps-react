import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function PhotoListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('photo.page.photo-list.title');
  }, [t]);

  return (
    <div id="PhotoListPage">
      <h1>PhotoListPage</h1>
    </div>
  )
}
