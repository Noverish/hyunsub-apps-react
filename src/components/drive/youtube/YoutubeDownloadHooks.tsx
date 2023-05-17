import { useContext } from 'react';

import { useDriveExplorerContext } from '../explorer/DriveExplorerHooks';
import { YoutubeDownloadContext } from './YoutubeDownloadContext';
import youtubeDownloadApi from 'src/api/drive/youtube-download';
import youtubeMetadataApi from 'src/api/drive/youtube-metadata';

export function useYoutubeDownload() {
  const { path } = useDriveExplorerContext();
  const [{ url }, setState] = useContext(YoutubeDownloadContext);

  return async (resolution: string, subtitles: string[]) => {
    setState({ loading: true });

    const { nonce } = await youtubeDownloadApi({
      url,
      path,
      resolution,
      subtitles,
    });

    setState({ nonce, loading: false });
  };
}

export function useYoutubeMetadata() {
  const [{ url }] = useContext(YoutubeDownloadContext);

  youtubeMetadataApi.useApiResult({ url }, { enabled: !!url });
}
