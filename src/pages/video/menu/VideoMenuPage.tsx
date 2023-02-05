import CommonContainer from 'src/components/common/header/CommonContainer';
import MenuAppsView from 'src/components/common/menu/MenuAppsView';
import MenuProfileView from 'src/components/common/menu/MenuProfileView';
import VideoHeader from 'src/components/video/VideoHeader';

export default function VideoMenuPage() {
  return (
    <div id="VideoMenuPage">
      <VideoHeader title="Menu" />
      <CommonContainer>
        <MenuProfileView />
        <hr />
        <MenuAppsView />
        <hr />
      </CommonContainer>
    </div>
  )
}
