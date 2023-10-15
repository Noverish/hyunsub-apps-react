import { t } from 'i18next';

import './VideoHomePageSection.scss';

interface Props {
  title: string;
  onMoreClick: () => void;
  items: JSX.Element[];
}

export default function VideoHomePageSection({ title, onMoreClick, items }: Props) {
  return (
    <section className="VideoHomePageSection hyunsub_border">
      <div className="header">
        <div className="title gray_on_hover" onClick={onMoreClick}>
          {title}
        </div>
        <div className="more" onClick={onMoreClick}>
          <span>{t('VideoHomePage.more')}</span>
        </div>
      </div>
      <div className="content hide_scrollbar">
        <div className="content_scroll">{items}</div>
      </div>
    </section>
  );
}
