import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ForbiddenPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = '403 Forbidden';
  }, []);

  return (
    <div id="ForbiddenPage" className="flex_center text-center" style={{ height: '100vh' }}>
      <h1 style={{ fontSize: '6rem' }}>{t('common.403.oh')}</h1>
      <h2>403 Forbidden</h2>
      <div>{t('common.403.not-exist')}</div>
      <Button href="/" variant="primary" className="mt-3">{t('common.403.go-to-home')}</Button>
    </div>
  )
}
