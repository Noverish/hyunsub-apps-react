import { useEffect } from 'react';
import useWebSocket from 'src/api/web-socket';

export interface PhotoUploadParams {
  path: string;
}

export interface PhotoUploadResult {
  success: boolean;
  path: string;
  errMsg: string;
}

const nonce = Math.random().toString(36).substring(2, 8);

const destination = `/v1/photo/upload/${nonce}`;

export default function usePhotoUploadApi(callback: (result: PhotoUploadResult) => void) {
  const client = useWebSocket();

  useEffect(() => {
    if (client) {
      client.onConnect = () => {
        client.subscribe(`${destination}/response`, (msg) => {
          const result = JSON.parse(msg.body) as PhotoUploadResult;
          callback(result);
        })
      }
    }
  }, [client, callback]);

  return (params: PhotoUploadParams) => {
    client?.publish({
      destination: `${destination}/request`,
      body: JSON.stringify(params),
    });
  }
}
