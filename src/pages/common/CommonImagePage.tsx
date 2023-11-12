import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { Loading } from 'src/components/common/LoadingSuspense';

import './CommonImagePage.scss';

interface Props {
  src?: string;
  alt?: string;
}

export default function CommonImagePage({ src, alt }: Props) {
  const content = src ? (
    <TransformWrapper centerOnInit>
      <TransformComponent>
        <img className="img-fluid" src={src} alt={alt} />
      </TransformComponent>
    </TransformWrapper>
  ) : (
    <Loading />
  );

  return <div className="CommonImagePage">{content}</div>;
}
