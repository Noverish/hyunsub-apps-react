import { useCallback, useContext, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import videoEntryDetailApi from 'src/api/video/video-entry-detail';
import useVideoHistorySetApi from 'src/api/video/video-history-set';
import { VideoSeason } from "src/model/video";
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailState';
import AppConstant from 'src/utils/constants';

const PAGE_SIZE = AppConstant.video.EPISODE_PAGE_SIZE;

export function useVideoDetailPageParams() {
  const [searchParams] = useSearchParams();
  const entryId = useParams().entryId || '';
  const videoId = searchParams.get('videoId') ?? undefined;

  return { entryId, videoId };
}

export function useLoadVideoDetailPage() {
  const params = useVideoDetailPageParams();
  return videoEntryDetailApi.useApi(params);
}

function parseSeasonAndPage(seasons: VideoSeason[], videoId: string): [VideoSeason, number] {
  for (const season of seasons) {
    const { episodes } = season;

    for (let i = 0; i < episodes.length; i++) {
      const episode = episodes[i];

      if (episode.videoId === videoId) {
        const page = Math.floor(i / AppConstant.video.EPISODE_PAGE_SIZE);
        return [season, page];
      }
    }
  }
  throw new Error('Never Happen');
}

export function useSeasonAndPage(seasons: VideoSeason[], videoId: string) {
  const [state, setState] = useContext(VideoDetailContext);
  const { season, page } = state;

  useEffect(() => {
    const [initSeason, initPage] = parseSeasonAndPage(seasons, videoId);

    setState({
      season: initSeason.name,
      page: initPage,
    });
  }, [seasons, videoId, setState]);

  const episodes = seasons.filter(v => v.name === season)[0]?.episodes || [];
  const total = episodes.length;
  const sliced = episodes.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const totalPage = Math.ceil(total / PAGE_SIZE);

  return {
    episodes: sliced,
    total,
    page,
    totalPage,
    setPage: (p: number) => setState({ page: p }),
  }
}

export function useVideoHistoryUpdator(videoId: string) {
  const videoHistorySetApi = useVideoHistorySetApi();

  const onTimeUpdate = useCallback((time: number) => {
    videoHistorySetApi({
      videoId,
      time: Math.floor(time),
    })
  }, [videoHistorySetApi, videoId]);

  return onTimeUpdate;
}
