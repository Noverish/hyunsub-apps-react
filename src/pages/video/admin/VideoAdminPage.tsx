import { Button } from 'react-bootstrap';

import { VideoAdminActions } from './VideoAdminState';
import VideoEntryCreateModal from './components/VideoEntryCreateModal';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import VideoRegisterCard from 'src/components/video/admin/VideoRegisterCard';
import { dispatch } from 'src/redux';

export default function VideoAdminPage() {
  const onEntryCreateClick = () => {
    dispatch(VideoAdminActions.update({ showVideoEntryCreateModal: true }));
  };

  return (
    <>
      <CommonLayout className="VideoAdminPage" title="어드민 페이지">
        <div>
          <Button onClick={onEntryCreateClick}>Entry 생성</Button>
          <hr />
          <VideoRegisterCard />
        </div>
      </CommonLayout>
      <VideoEntryCreateModal />
    </>
  );
}
