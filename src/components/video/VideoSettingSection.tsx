import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Video } from "src/model/video";
import { VideoDetailActions } from "src/pages/video/detail/VideoDetailState";
import { useDispatch } from "src/redux";
import AppConstant from "src/utils/constants";
import VideoSubtitleSettingCard from "./VideoSubtitleSettingCard";

export function setCaptionFontSize(size: number) {
  window.localStorage.setItem(AppConstant.video.SETTING_SUBTITLE_FONT_SIZE, size.toString());

  const captionElement: HTMLDivElement | null = document.querySelector('.plyr__captions');
  if (captionElement) {
    captionElement.style.fontSize = `${size}px`;
  }
}

export function getCaptionFontSize(): number {
  const value = window.localStorage.getItem(AppConstant.video.SETTING_SUBTITLE_FONT_SIZE)
    || AppConstant.video.SETTING_SUBTITLE_DEFAULT_FONT_SIZE;
  return parseInt(value);
}

interface Props {
  video: Video;
}

export default function VideoSettingSection({ video }: Props) {
  const initFontSize = getCaptionFontSize();
  const [fontSize, setFontSize] = useState(initFontSize);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    setCaptionFontSize(fontSize);
  }, [fontSize]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.currentTarget.value));
  }

  const hideSettingSection = () => {
    dispatch(VideoDetailActions.update({ showSetting: false }));
  }

  return (
    <section id="VideoSettingSection" className="mt-3">
      <Button variant="secondary" style={{ float: 'right' }} onClick={hideSettingSection}>{t('close')}</Button>
      <h3 className="mb-3">{t('video.setting-section.title')}</h3>
      <hr />
      <Form.Label>{t('video.setting-section.subtitle-font-size', [fontSize])}</Form.Label>
      <Form.Range onChange={onChange} min={1} max={100} value={fontSize} />
      <VideoSubtitleSettingCard subtitles={video.subtitles} />
    </section>
  )
}
