import PhotoPreviewView from './PhotoPreviewView';
import PhotoSelectHooks from './PhotoSelectHooks';
import { PhotoPreview } from 'src/model/photo';

import './PhotoListView.scss';

interface Props {
  photos: PhotoPreview[];
  itemHref: (preview: PhotoPreview) => string;
}

export default function PhotoListView({ photos, itemHref: href }: Props) {
  // hooks
  const onSelect = PhotoSelectHooks.useSelect(photos);

  // elements
  const elements = photos.map((v) => <PhotoPreviewView key={v.id} preview={v} href={href(v)} onSelect={onSelect} />);

  return <div className="PhotoListView d-grid gap-1 row-col-3 row-col-sm-4 row-col-md-5 row-col-lg-6">{elements}</div>;
}
