import { useEffect } from "react";
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import VideoRegisterCard from "src/components/video/admin/VideoRegisterCard";
import NotFoundPage from "src/pages/common/NotFoundPage";
import { useSelector } from "src/redux";

export function VideoAdminPage() {
  const isAdmin = useSelector(s => s.global.tokenPayload)?.isAdmin || false;

  useEffect(() => {
    document.title = 'Hyunflix Video Upload';
  }, []);

  return (
    <div id="VideoAdminPage">
      <MobileHeader title="어드민 페이지" />
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

export default function VideoAdminIndex() {
  const isAdmin = useSelector(s => s.global.tokenPayload)?.isAdmin || false;
  if (!isAdmin) {
    return <NotFoundPage />
  }

  return <VideoAdminPage />;
}
