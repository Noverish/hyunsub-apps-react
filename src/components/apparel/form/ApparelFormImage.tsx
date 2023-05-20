import { useContext, useMemo } from 'react';

import { ApparelFormContext } from './ApparelFormContext';
import { ApparelImage } from 'src/model/apparel';

import './ApparelFormImage.scss';

interface Props {
  image?: ApparelImage;
  file?: File;
}

export default function ApparelFormImage({ image, file }: Props) {
  const setState = useContext(ApparelFormContext)[1];

  const objectUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);

  const onDelete = () => {
    if (file) {
      setState((s) => {
        const index = s.uploads.findIndex((v) => v === file);
        s.uploads.splice(index, 1);
      });
    }

    if (image) {
      setState((s) => {
        s.deletes.push(image.imageId);
      });
    }
  };

  const src = image ? `${image.url}?size=512` : objectUrl;
  const alt = image ? image.imageId : file ? file.name : '';

  return (
    <div className="col ApparelFormImage">
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={src} alt={alt} />
        <div className="delete" onClick={onDelete}>
          <i className="fas fa-times"></i>
        </div>
      </div>
    </div>
  );
}
