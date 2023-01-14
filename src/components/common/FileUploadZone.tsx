import cs from 'classnames';
import { flatMap } from 'lodash';
import React, { useState } from 'react';
import { FileWithPath } from 'src/model/file';
import { extname } from 'path-browserify';

import './FileUploadZone.scss';

const ignoreExts = ['.DS_Store'];

interface Props extends React.HTMLProps<HTMLDivElement> {
  onUpload?: (entries: FileWithPath[]) => void;
  onElementDrop?: (dataTransfer: DataTransfer) => void;
}

export default function FileUploadZone(props: Props) {
  const { children, className, onUpload, onElementDrop, ...etc } = props;
  const [hover, setHover] = useState(0);
  const [isStringItem, setIsStringItem] = useState(false);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = e.dataTransfer.items;
    const stringItems = Array.from(items).filter(v => v.kind === 'string');
    setIsStringItem(stringItems.length > 0);
    setHover(v => v + 1);
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(v => v - 1);
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const items = e.dataTransfer.items;
    const stringItems = Array.from(items).filter(v => v.kind === 'string');
    const fileItems = Array.from(items).filter(v => v.kind === 'file');

    if (stringItems.length > 0) {
      onElementDrop?.(e.dataTransfer);
    }

    if (fileItems.length > 0) {
      handleDropEvent(fileItems).then(v => onUpload?.(v));
    }

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
      <div className="dropzone flex_center">
        <i className={isStringItem ? 'fas fa-arrow-down' : 'fas fa-upload'} />
      </div>
    </div>
  )
}

async function handleDropEvent(items: DataTransferItem[]): Promise<FileWithPath[]> {
  const promises = items
    .map(v => v.webkitGetAsEntry())
    .map(v => processEntry(v));
  const result = await Promise.all(promises);
  return flatMap(result)
    .filter(v => validExt(v.path));
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

async function readDir(entry: FileSystemDirectoryEntry): Promise<FileSystemEntry[]> {
  const reader = entry.createReader();

  const result: FileSystemEntry[] = [];
  while (true) {
    const files = await readReader(reader);
    if (files.length === 0) {
      break;
    }

    result.push(...files);
  }

  return result;
}

function readReader(reader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) => {
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

function validExt(path: string) {
  return !ignoreExts.includes(extname(path));
}
