import { useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { Loading } from 'src/components/common/LoadingSuspense';
import MobileHeader from 'src/components/common/header/MobileHeader';

import './CommonImagePage.scss';

interface Props {
  src?: string;
  alt?: string;
}

export default function CommonImagePage({ src, alt }: Props) {
  const [showHeader, setShowHeader] = useState(true);

  const onClick = () => {
    setShowHeader(!showHeader);
  };

  const onHeaderClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const content = src ? (
    <TransformWrapper centerOnInit>
      <TransformComponent>
        <img className="img-fluid" src={src} alt={alt} />
      </TransformComponent>
    </TransformWrapper>
  ) : (
    <Loading />
  );

  return (
    <div className="CommonImagePage" onClick={onClick}>
      {showHeader && <MobileHeader title={alt ?? ''} onHeaderClick={onHeaderClick} back />}
      {content}
    </div>
  );
}
