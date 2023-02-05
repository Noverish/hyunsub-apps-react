import { useTranslation } from 'react-i18next';
import getCategories from 'src/api/video/category';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import CommonTabBar from "../common/header/CommonTabBar";

export default function VideoTabBar() {
  const { t } = useTranslation()
  const categories = getCategories.useApi({});

  const items = categories.map(v => ({
    name: v.displayName,
    icon: v.iconHtmlClass,
    link: `/${v.name}`
  }))

  const newItems = [
    ...items,
    {
      name: t('VideoTabBar.search'),
      link: VideoRoutes.search,
      icon: 'fas fa-search',
    }
  ]

  return (
    <CommonTabBar items={newItems} />
  )
}
