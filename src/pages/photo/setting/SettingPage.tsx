import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function SettingPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('photo.page.setting.title');
  }, [t]);

  return (
    <div id="SettingPage">
      <h1>SettingPage</h1>
    </div>
  )
}
