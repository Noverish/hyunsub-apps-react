import { useEffect } from "react"
import { useTranslation } from "react-i18next";

export default function MyPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.document.title = t('auth.my-page.title');
  }, [t]);

  return (
    <div>
      <h1>MyPage</h1>
    </div>
  )
}
