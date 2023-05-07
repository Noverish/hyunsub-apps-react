export interface FileWithPath {
  file: File;
  path: string;
}

export interface FileUploadResult {
  index: number;
  nonce: string;
  fileName: string;
  mimeType: string;
}

export interface FileUploadStatus {
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
  }
}
