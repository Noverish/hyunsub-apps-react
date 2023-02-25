import VideoDesktopHeader from 'src/components/video/header/VideoDesktopHeader';
import VideoTabBar from 'src/components/video/header/VideoTabBar';

interface Props {

}

export default function VideoPageContainer(props: Props) {
  return (
    <>
      <VideoDesktopHeader />
      <VideoTabBar />
      <div>

      </div>
    </>
  )
}
