import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
  src: string | null;
}

export default function LoadingImage({ src }: Props) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => setLoaded(true);

  return (
    <>
      {loaded || <Spinner animation="border" />}
      {src && <img onLoad={onLoad} style={{ display: loaded ? 'block' : 'none' }} alt={src} src={src} />}
    </>
  );
}
