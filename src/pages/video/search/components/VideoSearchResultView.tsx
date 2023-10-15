import { t } from 'i18next';
import { useContext } from 'react';

import { VideoSearchResult } from 'src/api/video/video-search';
import VideoEntryList from 'src/components/video/VideoEntryList';
import { VideoCategoryContext } from 'src/context/video/VideoCategoryContext';

interface Props {
  query: string;
  result: VideoSearchResult;
}

export default function VideoSearchResultView({ query, result }: Props) {
  const categories = useContext(VideoCategoryContext);

  const resultNum = Object.values(result.entries).reduce((prev, curr) => prev + curr.length, 0);

  const sections = Object.entries(result.entries).map(([categoryName, entries]) => {
    const category = categories.filter((v) => v.name === categoryName)[0];

    return (
      <section key={category.name} className="mb-3">
        <h3>{category.displayName}</h3>
        <VideoEntryList category={category} entries={entries} />
      </section>
    );
  });

  return (
    <div className="VideoSearchResultView">
      <h3>{t('VideoSearchPage.result-title', [query, resultNum])}</h3>
      <hr className="my-2 my-md-3" />
      {sections}
    </div>
  );
}
