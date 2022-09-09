import { useEffect } from "react";
import { Container } from "react-bootstrap";
import ApiResultCard from "src/components/common/ApiResultCard";
import VideoHeader from "src/components/video/VideoHeader";
import VideoRegisterCard from "src/components/video/VideoRegisterCard";
import { useSelector } from "src/redux";

export default function VideoUploadPage() {
  const { result } = useSelector((s) => s.video.upload);
  
  useEffect(() => {
    document.title = 'Hyunflix Video Upload';
  }, []); 

  return (
    <div id="VideoUploadPage">
      <VideoHeader />
      <Container id="content" className="d-grid gap-3">
        {result && <ApiResultCard result={result} />}
        <VideoRegisterCard />
      </Container>
    </div>
  )
}
