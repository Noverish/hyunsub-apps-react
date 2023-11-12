import PhotoPreviewView from 'src/components/photo/photo-list/PhotoPreviewView';
import { PhotoPreview } from 'src/model/photo';

interface Props {
  items: PhotoPreview[];
  itemHref: (preview: PhotoPreview) => string;
}

export default function PhotoPreviewList({ items, itemHref }: Props) {
  const elements = items.map((v) => <PhotoPreviewView key={v.id} preview={v} href={itemHref(v)} />);

  return (
    <div className="PhotoPreviewList d-grid gap-1 row-col-3 row-col-sm-4 row-col-md-5 row-col-lg-6">{elements}</div>
  );
}
