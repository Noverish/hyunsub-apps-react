import { t } from 'i18next';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';

import VideoSettingSubtitleSizeCard from './VideoSettingSubtitleSizeCard';
import { Video } from 'src/model/video';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailContext';
import VideoSettingSubtitleSyncCard from 'src/pages/video/detail/components/VideoSettingSubtitleSyncCard';

interface Props {
  video: Video;
}

export default function VideoSettingSection({ video }: Props) {
  const [{ showSetting }, setState] = useContext(VideoDetailContext);

  const hideSettingSection = () => {
    setState({ showSetting: false });
  };

  if (!showSetting) {
    return <></>;
  }

  return (
    <section id="VideoSettingSection" className="mt-3">
      <Button variant="secondary" style={{ float: 'right' }} onClick={hideSettingSection}>
        {t('close')}
      </Button>
      <h3 className="mb-3">{t('video.setting-section.title')}</h3>
      <hr />
      <div className="d-grid gap-3">
        <VideoSettingSubtitleSizeCard />
        <VideoSettingSubtitleSyncCard subtitles={video.subtitles} />
      </div>
    </section>
  );
}
