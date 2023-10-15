import { t } from 'i18next';

import VideoHomePageHistorySection from './components/VideoHomePageHistorySection';
import VideoHomePageRecentSection from './components/VideoHomePageRecentSection';
import videoHomeApi from 'src/api/video/video-home';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';

function VideoHomePageInner() {
  const { recents, histories } = videoHomeApi.useApi({});

  const recentSections = recents.map((v) => <VideoHomePageRecentSection key={v.category.name} recent={v} />);
  const historySection = histories.length ? <VideoHomePageHistorySection histories={histories} /> : undefined;

  return (
    <>
      {historySection}
      {recentSections}
    </>
  );
}

export default function VideoHomePage() {
  setDocumentTitle(t('VideoHomePage.title'));

  return (
    <div className="VideoHomePage">
      <MobileHeader title="Hyunflix" />
      <CommonContainer>
        <LoadingSuspense>
          <VideoHomePageInner />
        </LoadingSuspense>
      </CommonContainer>
    </div>
  );
}
