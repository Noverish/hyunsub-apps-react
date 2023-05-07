import { t } from 'i18next';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { Video } from 'src/model/video';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailState';
import VideoSubtitleSettingCard from 'src/pages/video/detail/components/VideoSubtitleSettingCard';
import AppConstant from 'src/utils/constants';

export function setCaptionFontSize(size: number) {
  window.localStorage.setItem(AppConstant.video.SETTING_SUBTITLE_FONT_SIZE, size.toString());

  const captionElement: HTMLDivElement | null = document.querySelector('.plyr__captions');
  if (captionElement) {
    captionElement.style.fontSize = `${size}px`;
  }
}

export function getCaptionFontSize(): number {
  const value = window.localStorage.getItem(AppConstant.video.SETTING_SUBTITLE_FONT_SIZE) || AppConstant.video.SETTING_SUBTITLE_DEFAULT_FONT_SIZE;
  return parseInt(value);
}

interface Props {
  video: Video;
}

export default function VideoSettingSection({ video }: Props) {
  const [{ showSetting }, setState] = useContext(VideoDetailContext);
  const initFontSize = getCaptionFontSize();
  const [fontSize, setFontSize] = useState(initFontSize);

  useEffect(() => {
    setCaptionFontSize(fontSize);
  }, [fontSize]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.currentTarget.value));
  };

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
      <Form.Label>{t('video.setting-section.subtitle-font-size', [fontSize])}</Form.Label>
      <Form.Range onChange={onChange} min={1} max={100} value={fontSize} />
      <VideoSubtitleSettingCard subtitles={video.subtitles} />
    </section>
  );
}
