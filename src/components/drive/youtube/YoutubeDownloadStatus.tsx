import { useCallback, useEffect, useRef, useState } from 'react';

import driveListApi from 'src/api/drive/drive-list';
import useYoutubeDownloadStatus from 'src/api/file/youtube-download-status';
import { useDriveExplorerContext } from 'src/components/drive/explorer/DriveExplorerHooks';

interface Props {
  nonce: string;
}

export default function YoutubeDownloadStatus({ nonce }: Props) {
  const [state, setState] = useState<string[]>([]);
  const { path } = useDriveExplorerContext();
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    setState([]);
  }, [nonce]);

  useEffect(() => {
    ref.current?.scrollTo(0, Number.MAX_SAFE_INTEGER);
  }, [state]);

  const onMessage = useCallback((message: string) => {
    setState((v) => [...v, message]);
  }, []);

  const onClose = useCallback(() => {
    driveListApi.invalidate({ path });
  }, [path]);

  useYoutubeDownloadStatus({ nonce, onMessage, onClose });

  return (
    <pre className="YoutubeDownloadStatus" ref={ref}>
      <code>{state.join('')}</code>
    </pre>
  );
}
