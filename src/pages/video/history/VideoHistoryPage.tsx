import { t } from 'i18next';
import { useContext } from 'react';

import { VideoHistoryProvider } from './VideoHistroyContext';
import VideoHistoryList from './components/VideoHistoryList';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { VideoHistoryContext } from 'src/pages/video/history/VideoHistroyContext';
import VideoHistoryTab from 'src/pages/video/history/components/VideoHistoryTab';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

import './VideoHistoryPage.scss';

function VideoHistoryPage() {
  setDocumentTitle(t('VideoTabBar.history'));

  const isMobile = useBreakpointMobile();
  const [{ category }] = useContext(VideoHistoryContext);

  return (
    <div className="VideoHistoryPage">
      <MobileHeader title={t('VideoTabBar.history')} />
      <CommonContainer>
        {isMobile || <h2 className="mb-3">{t('VideoTabBar.history')}</h2>}
        <VideoHistoryTab />
        <LoadingSuspense>{category && <VideoHistoryList category={category} />}</LoadingSuspense>
      </CommonContainer>
    </div>
  );
}

export default function VideoHistoryIndex() {
  return (
    <VideoHistoryProvider>
      <VideoHistoryPage />
    </VideoHistoryProvider>
  );
}
