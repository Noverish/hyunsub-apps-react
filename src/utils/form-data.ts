import { AxiosProgressEvent } from 'axios';
import { encodeURI } from 'js-base64';

import { FileUploadProgress, FileWithPath } from 'src/model/file';

const BOUNDARY_SIZE = '------WebKitFormBoundaryouBAOKH3uCrNADuJrn'.length;
const DISPOISTION_SIZE = 'Content-Disposition: form-data; name="files"; filename=""rn'.length;
const DISPOISTION_LENGTH_SIZE = 'Content-Disposition: form-data; name="length"rn'.length;
const TYPE_SIZE = 'Content-Type: rn'.length;
const DIVIDER_SIZE = 4;

export function calcFormDataSize(files: FileWithPath[]): number[] {
  const lengthSize = BOUNDARY_SIZE + DISPOISTION_LENGTH_SIZE + DIVIDER_SIZE + files.length.toString().length;

  const fileSizes = files.map((v) => {
    const nameLen = encodeURI(v.path).length;
    const typeLen = v.file.type ? v.file.type.length : 'appliaction/octet-stream'.length;
    return BOUNDARY_SIZE + DISPOISTION_SIZE + nameLen + TYPE_SIZE + typeLen + DIVIDER_SIZE + v.file.size;
  });

  const sizes = [lengthSize, ...fileSizes];
  for (let i = 1; i < sizes.length; i++) {
    sizes[i] += sizes[i - 1];
  }

  sizes[sizes.length - 1] += BOUNDARY_SIZE + 2;

  return sizes;
}

export function calcProgress(sizes: number[], e: AxiosProgressEvent): FileUploadProgress | undefined {
  const total = e.total;
  if (!total) {
    return;
  }

  const now = e.loaded;
  const i = sizes.findIndex((v) => v >= now) - 1;
  const size = sizes[i + 1] - sizes[i];
  const diff = now - sizes[i];
  const ratio = Math.floor((diff / size) * 1000) / 10;
  return {
    current: {
      index: i,
      size,
      uploaded: diff,
      ratio: ratio,
    },
    total: {
      size: total,
      uploaded: now,
      ratio: Math.floor((now / total) * 1000) / 10,
    },
  };
}
