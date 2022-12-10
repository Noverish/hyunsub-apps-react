import { useEffect } from "react";
import CommonContainer from 'src/components/common/header/CommonContainer';
import VideoRegisterCard from "src/components/video/admin/VideoRegisterCard";
import VideoHeader from "src/components/video/VideoHeader";

export default function VideoAdminPage() {
  useEffect(() => {
    document.title = 'Hyunflix Video Upload';
  }, []);

  return (
    <div id="VideoAdminPage">
      <VideoHeader title="어드민 페이지" />
      <CommonContainer>
        <h1>어드민 페이지</h1>
        <hr />
        <div className="d-grid gap3">
          <VideoRegisterCard />
        </div>
      </CommonContainer>
    </div>
  )
}
