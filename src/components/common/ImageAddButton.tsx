import React, { useState } from 'react';
import './ImageAddButton.scss';
import cs from 'classnames';

interface Props {
  multiple?: boolean;
  callback?: (images: File[]) => void;
}

export default function ImageAddButton({ multiple, callback }: Props) {
  const [hover, setHover] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from((e.currentTarget.files || []))
    if (images) {
      callback?.(images);
      e.currentTarget.value = '';
    }
  }

  const onDragEnter = () => {
    setHover(true);
  }

  const onDragLeave = () => {
    console.log('onDragLeave');
    setHover(false);
  }

  return (
    <div className={cs("ImageAddButton ratio", { hover })} onDragEnter={onDragEnter} onDragLeave={onDragLeave}>
      <div>
        <i className="fas fa-plus"></i>
      </div>
      <input type="file" multiple={multiple} onChange={onChange} accept="image/jpeg,image/png" />
    </div>
  )
}
