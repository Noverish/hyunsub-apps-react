import { useEffect } from 'react';
import useWebSocket from 'src/api/web-socket';
import { PhotoPreview } from 'src/model/photo';

export interface PhotoUploadParams {
  nonce: string;
  name: string;
  millis: number;
  albumId?: string;
}

export interface PhotoUploadResult {
  success: boolean;
  nonce: string;
  preview: PhotoPreview;
  errMsg: string;
}

const pathNonce = Math.random().toString(36).substring(2, 8);
const destination = `/v1/photo/upload/${pathNonce}`;

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

  useEffect(() => {
    const timer = setInterval(() => {
      client?.publish({
        destination: `/ping`,
        body: 'ping',
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    }
  }, [client]);

  return (params: PhotoUploadParams) => {
    client?.publish({
      destination: `${destination}/request`,
      body: JSON.stringify(params),
    });
  }
}
