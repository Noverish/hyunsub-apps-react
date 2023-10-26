import React, { useContext } from 'react';

import { ApparelFormContext } from './ApparelFormContext';

import './ApparelImageAddButton.scss';

export default function ApparelImageAddButton() {
  const setState = useContext(ApparelFormContext)[1];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.currentTarget.files || []);
    if (images) {
      setState({ uploads: images });
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="ApparelImageAddButton ratio">
      <div>
        <i className="fas fa-plus"></i>
      </div>
      <input type="file" multiple onChange={onChange} accept="image/jpeg,image/png" />
    </div>
  );
}
