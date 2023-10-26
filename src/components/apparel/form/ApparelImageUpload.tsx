import { useContext } from 'react';

import { ApparelFormContext } from './ApparelFormContext';
import ApparelFormImage from 'src/components/apparel/form/ApparelFormImage';
import ImageAddButton from 'src/components/apparel/form/ApparelImageAddButton';
import { ApparelImage } from 'src/model/apparel';

interface Props {
  images: ApparelImage[];
}

export default function ApparelImageUpload({ images }: Props) {
  const [{ uploads, deletes }] = useContext(ApparelFormContext);

  const existElements = images
    .filter((v) => deletes.indexOf(v.imageId) < 0)
    .map((v) => <ApparelFormImage image={v} key={v.imageId} />);

  const uploadElements = uploads.map((v) => <ApparelFormImage file={v} key={v.name} />);

  return (
    <div className="ApparelImageUpload row g-3 row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">
      {existElements}
      {uploadElements}
      <div className="col">
        <div className="ratio ratio-1x1">
          <ImageAddButton />
        </div>
      </div>
    </div>
  );
}
