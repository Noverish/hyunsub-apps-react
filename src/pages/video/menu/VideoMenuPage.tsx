import CommonContainer from 'src/components/common/header/CommonContainer';
import CommonMenu from 'src/components/common/header/CommonMenu';
import VideoHeader from 'src/components/video/VideoHeader';

export default function VideoMenuPage() {
  return (
    <div id="VideoMenuPage">
      <VideoHeader title="Menu" />
      <CommonContainer>
        <CommonMenu />
      </CommonContainer>
    </div>
  )
}
