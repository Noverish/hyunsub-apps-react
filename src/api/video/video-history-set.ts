import useWebSocket from 'src/api/web-socket';

export interface VideoHistorySetParams {
  videoId: string;
  time: number;
}

const destination = `/v1/histories`;

export default function useVideoHistorySetApi() {
  const client = useWebSocket();

  return (params: VideoHistorySetParams) => {
    client?.publish({
      destination: `${destination}`,
      body: JSON.stringify(params),
    });
  };
}
