import { Button } from "react-bootstrap";
import { VideoEntryDetail } from "src/model/video";
import { VideoDetailActions } from "src/pages/video/detail/VideoDetailState";
import { useDispatch } from "src/redux";
import VideoEncodeCard from "./VideoEncodeCard";
import VideoMetadataScanCard from "./VideoMetadataScanCard";
import VideoRegisterToEntryCard from "./VideoRegisterToEntryCard";
import VideoRenameCard from "./VideoRenameCard";
import VideoSubtitleUploadCard from "./VideoSubtitleUploadCard";
import VideoThumbnailGenerateCard from "./VideoThumbnailGenerateCard";

interface Props {
  entryId: string;
  detail: VideoEntryDetail;
}

export default function VideoAdminSection({ entryId, detail }: Props) {
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
      <div className="d-grid gap-3">
        <VideoMetadataScanCard videoId={videoId} />
        <VideoRegisterToEntryCard entryId={entryId} />
        <VideoSubtitleUploadCard videoId={videoId} />
        <VideoThumbnailGenerateCard videoId={videoId} />
        <VideoRenameCard videoId={videoId} title={title} />
        <VideoEncodeCard videoId={videoId} />
      </div>
    </section>
  )
}
