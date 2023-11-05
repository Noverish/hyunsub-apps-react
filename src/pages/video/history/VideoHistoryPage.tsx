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
  const { isChooseMode, toggleChooseMode, clearChooseContext } = useContext(ChooseContext);
  const deleteHistory = VideoHistoryHooks.useDelete();

  const chooseButton = {
    icon: 'far fa-check-circle',
    name: t('select'),
    onClick: toggleChooseMode,
  };

  const cancelButton = {
    icon: 'fas fa-times',
    name: t('cancel'),
    onClick: clearChooseContext,
  };

  const deleteButton = {
    icon: 'fas fa-trash-alt',
    name: t('delete'),
    onClick: deleteHistory,
  };

  const btns = isChooseMode ? [deleteButton, cancelButton] : [chooseButton];

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
