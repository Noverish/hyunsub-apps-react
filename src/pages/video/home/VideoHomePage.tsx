import cs from 'classnames';
import { t } from 'i18next';
import videoHomeApi, { VideoHomeRecent } from 'src/api/video/video-home';
import CommonContainer from 'src/components/common/header/CommonContainer';
import VideoEntryView from 'src/components/video/VideoEntryView';
import VideoHeader from 'src/components/video/VideoHeader';
import router from 'src/pages/router';
import { useBreakpointSm } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';
import VideoRoutes from '../VideoRoutes';

import './VideoHomePage.scss';

function VideoHomePageRecentSection({ recent }: { recent: VideoHomeRecent }) {
  const { category, list } = recent;
  const isSm = useBreakpointSm();

  const onMoreClick = () => {
    router.navigate(VideoRoutes.listRoute(category.name));
  }

  const entries = list.map(entry => (
    <VideoEntryView key={entry.id} category={category} entry={entry} />
  ));

  return (
    <section key={category.displayName} className="recent">
      <div className="recent_header">
        <div className="recent_category gray_on_hover" onClick={onMoreClick}>{t('VideoHomePage.recent-title', [category.displayName])}</div>
        <div className="recent_more" onClick={onMoreClick}><span>{t('VideoHomePage.more')}</span></div>
      </div>
      <div className="recent_entry_scroll hide_scrollbar">
        <div className={cs("recent_entry_list", isSm || 'row row-cols-3 row-cols-md-4 row-cols-xl-6 g-3')}>
          {entries}
        </div>
      </div>
    </section>
  )
}

export default function VideoHomePage() {
  setDocumentTitle(t('VideoHomePage.title'));

  const result = videoHomeApi.useApi({});

  const recents = result.recents.map(v => (
    <VideoHomePageRecentSection key={v.category.name} recent={v} />
  ));

  return (
    <div className="VideoHomePage">
      <VideoHeader title="Hyunflix" />
      <CommonContainer>
        {recents}
      </CommonContainer>
    </div>
  )
}
