export interface FileWithPath {
  file: File;
  path: string;
  type: string;
}

export type FileUploadItemStatus = 'forbidden' | 'exist' | 'uploaded';

export interface FileUploadItemResult {
  status: FileUploadItemStatus;
  fileName: string;
}

export interface FileUploadProgress {
  current: {
    index: number;
    size: number;
    uploaded: number;
    ratio: number;
  };
  total: {
    size: number;
    uploaded: number;
    ratio: number;
  };
}
