import flatMap from 'lodash/flatMap';
import { basename, extname } from 'path-browserify';
import React, { useState } from 'react';

import { FileWithPath } from 'src/model/file';

const ignores = ['.DS_Store'];

interface Params {
  accept?: string;
  onFileDrop?: (files: FileWithPath[]) => void;
  onElementDrop?: (DataTransfer: DataTransfer) => void;
}

export default function useDragAndDrop({ accept, onElementDrop, onFileDrop }: Params) {
  const [hover, setHover] = useState(0);
  const [isElement, setIsElement] = useState(false);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = e.dataTransfer.items;
    const stringItems = Array.from(items).filter((v) => v.kind === 'string');
    setIsElement(stringItems.length > 0);
    setHover((v) => v + 1);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover((v) => v - 1);
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const items = e.dataTransfer.items;
    const stringItems = Array.from(items).filter((v) => v.kind === 'string');
    const fileItems = Array.from(items).filter((v) => v.kind === 'file');

    if (stringItems.length > 0) {
      onElementDrop?.(e.dataTransfer);
    }

    if (fileItems.length > 0) {
      let files = await handleDropEvent(fileItems);
      if (accept) {
        files = files.filter((v) => v.type && accept.includes(v.type));
      }
      onFileDrop?.(files);
    }

    setHover(0);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 이걸 하지 않으면 브라우저의 기본 동작이 실행됨 (새 탭이 열린다거나)
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []).map((v) => ({ file: v, path: v.name, type: v.type }));
    onFileDrop?.(files);
  };

  return {
    props: {
      onDragEnter,
      onDragLeave,
      onDrop,
      onDragOver,
    },
    hover: hover > 0,
    isElement,
    isFile: !isElement,
    onInputChange,
  };
}

async function handleDropEvent(items: DataTransferItem[]): Promise<FileWithPath[]> {
  const promises = items.map((v) => v.webkitGetAsEntry()).map((v) => processEntry(v));
  const result = await Promise.all(promises);
  return flatMap(result).filter((v) => validExt(v.path));
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
    const result = await Promise.all(entries.map((v) => processEntry(v)));
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
    );
  });
}

function getFile(entry: FileSystemFileEntry): Promise<FileWithPath> {
  return new Promise((resolve, reject) => {
    entry.file(
      (file) =>
        resolve({
          file,
          path: entry.fullPath.replace(/^\//, '').normalize('NFC'),
          type: parseFileType(file),
        }),
      (err) => reject(err),
    );
  });
}

const validExt = (path: string) => !ignores.includes(basename(path));

function parseFileType(file: File): string {
  const type = file.type;
  if (type) {
    return type;
  }

  const ext: string = extname(file.name).toLowerCase();

  switch (ext) {
    case '.mov':
      return 'video/quicktime';
    default:
      return type;
  }
}
