import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.document.title = '404 Not Found';
  }, []);

  return (
    <div id="NotFoundPage" className="h-100 flex-center text-center">
      <h1 style={{ fontSize: '6rem' }}>{t('common.404.oh')}</h1>
      <h2>404 Not Found</h2>
      <div>{t('common.404.not-exist')}</div>
      <Button href="/" variant="primary" className="mt-3">{t('common.404.go-to-home')}</Button>
    </div>
  )
}
