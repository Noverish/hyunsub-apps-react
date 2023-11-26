import { Spinner } from 'react-bootstrap';

export interface CommonViewerData {
  type: 'photo' | 'video';
  url?: string;
  alt?: string;
}

interface CommonViewerSlideProps {
  data: CommonViewerData;
  offset: number;
}

export default function CommonViewerSlide({ data, offset }: CommonViewerSlideProps) {
  return (
    <div className="swiper-slide" style={{ left: `${offset}px` }}>
      {renderContent(data)}
    </div>
  );
}

function renderContent({ url, type, alt }: CommonViewerData) {
  if (!url) {
    return <Spinner animation="border" />;
  }

  if (type === 'video') {
    return (
      <video controls className="img-fluid">
        <source src={url} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="swiper-zoom-container">
      <img src={url} alt={alt ?? url} className="img-fluid" />
    </div>
  );
}
