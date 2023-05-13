import { useCallback, useEffect, useState } from 'react';

import driveListApi from 'src/api/drive/drive-list';
import useYoutubeDownloadStatus from 'src/api/file/youtube-download-status';
import { useDriveExplorerContext } from 'src/components/drive/explorer/DriveExplorerHooks';

interface Props {
  nonce: string;
}

export default function YoutubeDownloadStatus({ nonce }: Props) {
  const [state, setState] = useState<string[]>([]);
  const { path } = useDriveExplorerContext();

  useEffect(() => {
    setState([]);
  }, [nonce])

  const onMessage = useCallback((message: string) => {
    setState((v) => [...v, message]);
  }, []);

  const onClose = useCallback(() => {
    driveListApi.invalidate({ path });
  }, [path]);

  useYoutubeDownloadStatus({ nonce, onMessage, onClose });

  return (
    <pre className="YoutubeDownloadStatus">
      <code>{state.join('')}</code>
    </pre>
  );
}
