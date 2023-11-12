import { Loading } from 'src/components/common/LoadingSuspense';

import './CommonImagePage.scss';

interface Props {
  src?: string;
  alt?: string;
}

export default function CommonImagePage({ src, alt }: Props) {
  return <div className="CommonImagePage">{src ? <img className="img-fluid" src={src} alt={alt} /> : <Loading />}</div>;
}
