import useWebSocket from 'src/api/web-socket';

export interface VideoHistorySetParams {
  videoId: string;
  time: number;
}

const destination = `/v1/video/history`;

export default function useVideoHistorySetApi() {
  const client = useWebSocket();

  return (params: VideoHistorySetParams) => {
    client?.publish({
      destination: `${destination}/request`,
      body: JSON.stringify(params),
    });
  };
}
