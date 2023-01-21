import { useTranslation } from "react-i18next";
import comicListApi from "src/api/comic/comic-list";
import ComicHeader from "src/components/comic/ComicHeader";
import ComicPreviewView from "src/components/comic/ComicPreviewView";
import ComicTabBar from "src/components/comic/ComicTabBar";
import CommonContainer from "src/components/common/header/CommonContainer";

export default function ComicListPage() {
  const { t } = useTranslation();

  const comics = comicListApi.useApi({});

  const elements = comics.map(v => (
    <ComicPreviewView key={v.id} comic={v} />
  ))

  return (
    <div className="ComicListPage">
      <ComicHeader title={t('comic.ComicListPage.title')} />
      <ComicTabBar />
      <CommonContainer>
        <div>
          {elements}
        </div>
      </CommonContainer>
    </div>
  )
}
