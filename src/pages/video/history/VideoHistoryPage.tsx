import { t } from 'i18next';
import { useContext } from 'react';

import { VideoHistoryProvider } from './VideoHistoryContext';
import VideoHistoryHooks from './VideoHistoryHooks';
import VideoHistoryList from './components/VideoHistoryList';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { ChooseContext, ChooseProvider } from 'src/context/choose/ChooseContext';
import { VideoHistoryContext } from 'src/pages/video/history/VideoHistoryContext';
import VideoHistoryTab from 'src/pages/video/history/components/VideoHistoryTab';

import './VideoHistoryPage.scss';

function VideoHistoryPage() {
  const [{ category }] = useContext(VideoHistoryContext);
  const { isChooseMode, toggleChooseMode } = useContext(ChooseContext);
  const deleteHistory = VideoHistoryHooks.useDelete();

  const deleteButton = {
    icon: 'fas fa-trash-alt',
    onClick: toggleChooseMode,
  };

  const confirmButton = {
    icon: 'fas fa-check',
    onClick: deleteHistory,
  };

  const btns = [isChooseMode ? confirmButton : deleteButton];

  return (
    <CommonLayout className="VideoHistoryPage" title={t('VideoTabBar.history')} btns={btns}>
      <VideoHistoryTab />
      <LoadingSuspense>{category && <VideoHistoryList category={category} />}</LoadingSuspense>
    </CommonLayout>
  );
}

export default function VideoHistoryIndex() {
  return (
    <VideoHistoryProvider>
      <ChooseProvider>
        <VideoHistoryPage />
      </ChooseProvider>
    </VideoHistoryProvider>
  );
}
