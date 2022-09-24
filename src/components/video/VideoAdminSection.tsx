import { Button } from "react-bootstrap";
import { VideoEntryDetail } from "src/model/video";
import { VideoDetailActions } from "src/pages/video/detail/VideoDetailState";
import { useDispatch } from "src/redux";
import VideoEncodeCard from "./VideoEncodeCard";
import VideoMetadataScanCard from "./VideoMetadataScanCard";
import VideoRenameCard from "./VideoRenameCard";
import VideoSubtitleUploadSection from "./VideoSubtitleUploadSection";
import VideoThumbnailGenerateCard from "./VideoThumbnailGenerateCard";

interface Props {
  detail: VideoEntryDetail,
}

export default function VideoAdminSection({ detail }: Props) {
  const dispatch = useDispatch();

  const hideAdminSection = () => {
    dispatch(VideoDetailActions.update({ showAdmin: false }));
  }

  const { title, videoId } = detail.video;

  return (
    <section id="VideoAdminSection" className="mt-3">
      <Button variant="secondary" style={{ float: 'right' }} onClick={hideAdminSection}>Close</Button>
      <h3>관리자용 비디오 설정</h3>
      <hr />
      <div className="mb-3">
        <VideoMetadataScanCard videoId={videoId} />
      </div>
      <div className="mb-3">
        <VideoThumbnailGenerateCard videoId={videoId} />
      </div>
      <div className="mb-3">
        <VideoSubtitleUploadSection videoId={videoId} />
      </div>
      <div className="mb-3">
        <VideoRenameCard videoId={videoId} title={title} />
      </div>
      <div className="mb-3">
        <VideoEncodeCard videoId={videoId} />
      </div>
    </section>
  )
}
