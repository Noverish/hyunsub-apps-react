import { useEffect } from 'react';

import AppConstant from 'src/utils/constants';

const url = `${AppConstant.file.HOST}/api/video/youtube/download/status`;

interface YoutubeDownloadStatusParams {
  nonce: string;
  onMessage: (message: string) => void;
  onClose?: () => void;
}

export default function useYoutubeDownloadStatus({ nonce, onMessage, onClose }: YoutubeDownloadStatusParams) {
  useEffect(() => {
    const es = new EventSource(url + `?nonce=${nonce}`, { withCredentials: true });

    es.addEventListener('data', (event: MessageEvent<string>) => {
      onMessage(event.data);
    });

    es.addEventListener('close', () => {
      es.close();
      onClose?.();
    });

    return () => {
      if (es.readyState !== EventSource.CLOSED) {
        es.close();
      }
    };
  }, [nonce, onMessage, onClose]);
}
