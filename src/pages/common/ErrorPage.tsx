import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'src/redux';

import './ErrorPage.scss';

export default function ErrorPage() {
  const { t } = useTranslation();
  const { errMsg } = useSelector(s => s.global);
  
  useEffect(() => {
    window.document.title = '500 Server Error';
  }, []);

  return (
    <div id="ErrorPage" className="flex_center text-center" style={{ height: '100vh' }}>
      <h1 style={{ fontSize: '6rem' }}>{t('common.500.oh')}</h1>
      <h2>{t('common.500.error')}</h2>
      <div>{errMsg}</div>
      <Button href="/" variant="primary" className="mt-3">{t('common.500.go-to-home')}</Button>
    </div>
  )
}
