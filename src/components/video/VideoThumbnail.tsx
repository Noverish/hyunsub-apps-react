import cs from 'classnames';

import './VideoThumbnail.scss';


interface Props {
  src: string;
  alt?: string;
  time: number | null;
  duration: number;
  className?: string;
  active?: boolean;
}

export default function VideoThumbnail({ src, alt, time, duration, className, active }: Props) {
  const timePercent = time ? (time / duration * 100) : 0;

  return (
    <div className={cs("VideoThumbnail ratio", className)}>
      <img className="thumbnail img-fluid" src={src} alt={alt} />
      <div className={cs("active_container", { active })}>
        <i className="fas fa-play" />
      </div>
      <div className="time_container">
        <div className="time" style={{ width: `${timePercent}%` }} />
      </div>
    </div>
  )
}
