import ComicPreviewView from 'src/components/comic/ComicPreviewView';
import { ComicPreview } from 'src/model/comic';

interface Props {
  previews: ComicPreview[];
}

export default function ComicPreviewList({ previews }: Props) {
  const elements = previews.map((v) => <ComicPreviewView key={v.id} comic={v} />);

  return <div className="d-grid gap-2 gap-md-3 row-col-3 row-col-md-4 row-col-xl-6">{elements}</div>;
}
