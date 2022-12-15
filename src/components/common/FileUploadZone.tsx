import cs from 'classnames';
import { flatMap } from 'lodash';
import React, { useState } from 'react';
import { FileWithPath } from 'src/model/file';

import './FileUploadZone.scss';

const ignores = ['.DS_Store'];

interface Props extends React.HTMLProps<HTMLDivElement> {
  onUpload?: (entries: FileWithPath[]) => void;
}

export default function FileUploadZone(props: Props) {
  const { children, className, onUpload, ...etc } = props;
  const [hover, setHover] = useState(0);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(v => v + 1);
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(v => v - 1);
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleDropEvent(e).then(v => onUpload?.(v));
    setHover(0);
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 이걸 하지 않으면 브라우저의 기본 동작이 실행됨 (새 탭이 열린다거나)
  }

  return (
    <div
      className={cs('FileUploadZone', className, { hover: hover > 0 })}
      {...etc}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {children}
      <div className="dropzone fit_parent flex_center">
        <i className="fas fa-upload" />
      </div>
    </div>
  )
}

async function handleDropEvent(e: React.DragEvent<HTMLDivElement>): Promise<FileWithPath[]> {
  const items = e.dataTransfer.items;
  const promises = Array.from(items)
    .map(v => v.webkitGetAsEntry())
    .map(v => processEntry(v));
  const result = await Promise.all(promises);
  return flatMap(result)
    .filter(v => validPath(v.path));
}

async function processEntry(entry: FileSystemEntry | null): Promise<FileWithPath[]> {
  if (!entry) {
    return [];
  }

  if (entry.isFile) {
    const file = await getFile(entry as FileSystemFileEntry);
    return [file];
  }

  if (entry.isDirectory) {
    const entries = await readDir(entry as FileSystemDirectoryEntry);
    const result = await Promise.all(entries.map(v => processEntry(v)));
    return flatMap(result);
  }

  return [];
}

function readDir(entry: FileSystemDirectoryEntry): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) => {
    const reader = entry.createReader();
    reader.readEntries(
      (files) => resolve(files),
      (err) => reject(err),
    )
  });
}

function getFile(entry: FileSystemFileEntry): Promise<FileWithPath> {
  return new Promise((resolve, reject) => {
    entry.file(
      (file) => resolve({ file, path: entry.fullPath.replace(/^\//, '') }),
      (err) => reject(err),
    )
  })
}

function validPath(path: string) {
  const segments = path.split('.');
  const ext = segments[segments.length - 1];
  console.log({ ext, predicate: ignores.includes('.' + ext) });
  return !ignores.includes('.' + ext);
}