import React from 'react';
import './ImageAddButton.scss';

interface Props {
  multiple?: boolean;
  callback: (images: File[]) => void;
}

export default function ImageAddButton({ multiple, callback }: Props) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from((e.currentTarget.files || []))
    if (images) {
      callback(images);
      e.currentTarget.value = '';
    }
  }

  return (
    <div className="ImageAddButton ratio">
      <div>
        <i className="fas fa-plus"></i>
      </div>
      <input type="file" multiple={multiple} onChange={onChange} accept="image/jpeg,image/png" />
    </div>
  )
}
