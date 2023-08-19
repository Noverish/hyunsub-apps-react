import { t } from 'i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';

import AppConstant from 'src/utils/constants';

export function setCaptionFontSize(size: number) {
  window.localStorage.setItem(AppConstant.video.SETTING_SUBTITLE_FONT_SIZE, size.toString());

  const captionElement: HTMLDivElement | null = document.querySelector('.plyr__captions');
  if (captionElement) {
    captionElement.style.fontSize = `${size}px`;
  }
}

export function getCaptionFontSize(): number {
  const value =
    window.localStorage.getItem(AppConstant.video.SETTING_SUBTITLE_FONT_SIZE) ||
    AppConstant.video.SETTING_SUBTITLE_DEFAULT_FONT_SIZE;
  return parseInt(value);
}

export default function VideoSettingSubtitleSizeCard() {
  const initFontSize = getCaptionFontSize();
  const [fontSize, setFontSize] = useState(initFontSize);

  useEffect(() => {
    setCaptionFontSize(fontSize);
  }, [fontSize]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.currentTarget.value));
  };

  return (
    <Card className="VideoSettingSubtitleSizeCard">
      <Card.Header>{t('video.VideoSettingSubtitleSizeCard.title')}</Card.Header>
      <Card.Body>
        <Form.Label>{t('video.VideoSettingSubtitleSizeCard.label', [fontSize])}</Form.Label>
        <Form.Range onChange={onChange} min={1} max={100} value={fontSize} />
      </Card.Body>
    </Card>
  );
}
