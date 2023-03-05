import cs from 'classnames';
import React from 'react';
import useDragAndDrop from 'src/hooks/drag-and-drop-hook';
import { FileWithPath } from 'src/model/file';

import './FileUploadZone.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
  onUpload?: (entries: FileWithPath[]) => void;
  onElementDrop?: (dataTransfer: DataTransfer) => void;
}

export default function FileUploadZone(props: Props) {
  const { children, className, onUpload, onElementDrop, ...etc } = props;

  const { props: dragAndDropProps, hover, isElement } = useDragAndDrop({
    onFileDrop: onUpload,
    onElementDrop,
  });

  return (
    <div
      className={cs('FileUploadZone', className, { hover })}
      {...dragAndDropProps}
      {...etc}
    >
      {children}
      <div className="dropzone flex_center">
        <i className={isElement ? 'fas fa-arrow-down' : 'fas fa-upload'} />
      </div>
    </div>
  )
}
