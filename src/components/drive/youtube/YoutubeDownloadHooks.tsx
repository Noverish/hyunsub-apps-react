import { useContext } from "react";
import { useDriveExplorerContext } from "../explorer/DriveExplorerHooks";
import { YoutubeDownloadContext } from "./YoutubeDownloadContext";
import youtubeDownloadApi from "src/api/drive/youtube-download";

export function useYoutubeDownload() {
  const { path } = useDriveExplorerContext();
  const setState = useContext(YoutubeDownloadContext)[1];

  return async (url: string) => {
    setState({ loading: true });

    const { nonce } = await youtubeDownloadApi({ url, path, resolution: 1080 });

    setState({ nonce, loading: false });
  }
}
