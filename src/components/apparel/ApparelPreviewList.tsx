import ApparelPreviewItem from './ApparelPreviewItem';
import { ApparelPreview } from 'src/model/apparel';

interface ApparelPreviewListProps {
  apparels: ApparelPreview[];
}

export default function ApparelPreviewList({ apparels }: ApparelPreviewListProps) {
  const elements = apparels.map((v) => <ApparelPreviewItem key={v.id} apparel={v} />);

  return (
    <div id="ApparelPreviewList" className="g-2 row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">
      {elements}
    </div>
  );
}
