import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { VideoAdminActions } from './VideoAdminState';
import VideoEntryCreateModal from './components/VideoEntryCreateModal';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import VideoRegisterCard from 'src/components/video/admin/VideoRegisterCard';
import { useIsAdmin } from 'src/hooks/token';
import NotFoundPage from 'src/pages/common/NotFoundPage';
import { dispatch } from 'src/redux';

export function VideoAdminPage() {
  useEffect(() => {
    document.title = 'Hyunflix Video Upload';
  }, []);

  const onEntryCreateClick = () => {
    dispatch(VideoAdminActions.update({ showVideoEntryCreateModal: true }));
  };

  return (
    <div id="VideoAdminPage">
      <MobileHeader title="어드민 페이지" />
      <CommonContainer>
        <h1>어드민 페이지</h1>
        <hr />
        <div>
          <Button onClick={onEntryCreateClick}>Entry 생성</Button>
          <hr />
          <VideoRegisterCard />
        </div>
      </CommonContainer>
      <VideoEntryCreateModal />
    </div>
  );
}

export default function VideoAdminIndex() {
  if (!useIsAdmin()) {
    return <NotFoundPage />;
  }

  return <VideoAdminPage />;
}
