import { Dispatch } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import scanVideoMetadata from "src/api/video/video-scan-metadata";
import videoThumbnail from "src/api/video/video-thumbnail";
import { VideoEntryDetail } from "src/model/video";
import { VideoDetailActions } from "src/pages/video/detail/VideoDetailState";
import { RootState, useDispatch, useSelector } from "src/redux";
import { GlobalActions } from "src/redux/global";
import ApiResultCard from "../common/ApiResultCard";
import VideoRenameCard from "./VideoRenameCard";
import VideoSubtitleUploadSection from "./VideoSubtitleUploadSection";

const scanVideoMetadataAction = (videoId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));
  const scanMetadataResult = await scanVideoMetadata({ videoId });
  dispatch(VideoDetailActions.update({ scanMetadataResult }));
  dispatch(GlobalActions.update({ loading: false }));
}

const videoThumbnailAction = (videoId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));
  const time = window.player?.currentTime
  const videoThumbnailResult = await videoThumbnail({ videoId, time });
  dispatch(VideoDetailActions.update({ videoThumbnailResult }));
  dispatch(GlobalActions.update({ loading: false }));
};

interface Props {
  detail: VideoEntryDetail,
}

export default function VideoAdminSection({ detail }: Props) {
  const dispatch = useDispatch();
  const { scanMetadataResult, videoThumbnailResult } = useSelector(s => s.video.detail);

  const hideAdminSection = () => {
    dispatch(VideoDetailActions.update({ showAdmin: false }));
  }

  const onScanMetadataClick = () => {
    dispatch(scanVideoMetadataAction(detail.video.videoId));
  }

  const videoThumbnailClick = () => {
    dispatch(videoThumbnailAction(detail.video.videoId));
  }

  return (
    <section id="VideoAdminSection" className="mt-3">
      <Button variant="secondary" style={{ float: 'right' }} onClick={hideAdminSection}>Close</Button>
      <h3>관리자용 비디오 설정</h3>
      <hr />
      <div className="mb-3">
        <h4>이 비디오 메타데이터 스캔</h4>
        <Button variant="primary" onClick={onScanMetadataClick}>Scan</Button>
        {scanMetadataResult && <ApiResultCard result={scanMetadataResult} />}
      </div>
      <div className="mb-3">
        <h4>비디오 썸네일 생성</h4>
        <Button variant="primary" onClick={videoThumbnailClick}>생성</Button>
        {videoThumbnailResult && <ApiResultCard result={videoThumbnailResult} />}
      </div>
      <div className="mb-3">
        <VideoSubtitleUploadSection videoId={detail.video.videoId} />
      </div>
      <div className="mb-3">
        <VideoRenameCard videoId={detail.video.videoId} title={detail.video.title} />
      </div>
    </section>
  )
}
