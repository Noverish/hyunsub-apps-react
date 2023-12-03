import { useEffect } from 'react';

import useWebSocket from 'src/api/web-socket';
import { PhotoPreview } from 'src/model/photo';
import { generateRandomString } from 'src/utils';

export interface PhotoProcessHookParams {
  callback: (result: PhotoProcessResult) => void;
}

export interface PhotoProcessParams {
  nonce: string;
  name: string;
  millis: number;
  albumId?: string;
}

export interface PhotoProcessResult {
  success: boolean;
  nonce: string;
  preview: PhotoPreview | null;
  errMsg: string | null;
}

const pathNonce = generateRandomString(16);
const destination = `/v1/photo/upload/${pathNonce}`;

export default function usePhotoUploadApi({ callback }: PhotoProcessHookParams) {
  const client = useWebSocket();

  useEffect(() => {
    if (!client) {
      return;
    }

    client.onConnect = () => {
      client.subscribe(`${destination}/response`, (msg) => {
        const result: PhotoProcessResult = JSON.parse(msg.body);
        callback(result);
      });
    };
  }, [client, callback]);

  return (params: PhotoProcessParams) => {
    client?.publish({
      destination: `${destination}/request`,
      body: JSON.stringify(params),
    });
  };
}
