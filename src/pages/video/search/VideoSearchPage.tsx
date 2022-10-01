import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import getCategories from "src/api/video/category";
import searchVideo from "src/api/video/video-search";
import VideoEntryList from "src/components/video/VideoEntryList";
import VideoHeader from "src/components/video/VideoHeader";

export default function VideoSearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const params = { query };
  const { t } = useTranslation();

  const searchResult = searchVideo.useApi(params);
  const categories = getCategories.useApi();
  const resultNum = Object.values(searchResult.entries).reduce((prev, curr) => prev + curr.length, 0);

  const entriesList = Object.entries(searchResult.entries).map(([categoryName, entries]) => {
    const category = categories.filter(v => v.name === categoryName)[0];

    return (
      <div key={category.name} className="mb-3">
        <h3>{category.displayName}</h3>
        <VideoEntryList category={category} entries={entries} />
      </div>
    );
  })

  return (
    <div id="VideoSearchPage">
      <VideoHeader />
      <Container id="content">
        <h2>{t('video.page.search.title', [query, resultNum])}</h2>
        <hr />
        {entriesList}
      </Container>
    </div>
  )
}
