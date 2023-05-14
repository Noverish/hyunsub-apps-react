import cs from 'classnames';
import { t } from 'i18next';

import VideoRoutes from '../VideoRoutes';
import videoHomeApi, { VideoHomeRecent } from 'src/api/video/video-home';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import VideoEntryView from 'src/components/video/VideoEntryView';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

import './VideoHomePage.scss';

function VideoHomePageRecentSection({ recent }: { recent: VideoHomeRecent }) {
  const { category, list } = recent;
  const isMobile = useBreakpointMobile();

  const onMoreClick = () => {
    router.navigate(VideoRoutes.listRoute(category.name));
  };

  const entries = list.map((entry) => <VideoEntryView key={entry.id} category={category} entry={entry} />);

  return (
    <section key={category.displayName} className="recent hyunsub_border">
      <div className="recent_header">
        <div className="recent_category gray_on_hover" onClick={onMoreClick}>
          {category.displayName}
        </div>
        <div className="recent_more" onClick={onMoreClick}>
          <span>{t('VideoHomePage.more')}</span>
        </div>
      </div>
      <div className="recent_entry_scroll hide_scrollbar">
        <div className={cs('recent_entry_list', isMobile || `row g-2 g-md-3 ${category.listHtmlClass}`)}>{entries}</div>
      </div>
    </section>
  );
}

function VideoHomePageInner() {
  const data = videoHomeApi.useApi({});

  const recents = data.recents.map((v) => <VideoHomePageRecentSection key={v.category.name} recent={v} />);

  return <>{recents}</>;
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
