import { useCallback, useContext, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
import videoEntryDetailApi from 'src/api/video/video-entry-detail';
import useVideoHistorySetApi from 'src/api/video/video-history-set';
import { VideoSeason } from 'src/model/video';
import router from 'src/pages/router';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailContext';
import AppConstant from 'src/utils/constants';

const PAGE_SIZE = AppConstant.video.EPISODE_PAGE_SIZE;

export function useVideoDetailPageParams() {
  const [searchParams] = useSearchParams();
  const entryId = useParams().entryId || '';
  const videoId = searchParams.get('videoId') ?? undefined;

  return { entryId, videoId };
}

export function useVideoDetailPageData() {
  const params = useVideoDetailPageParams();
  return videoEntryDetailApi.useApi(params);
}

export function useVideoDetailPageSeason(): VideoSeason | null {
  const data = useVideoDetailPageData();
  const seasons = data.seasons || [];

  for (const season of seasons) {
    for (const epidsode of season.episodes) {
      if (epidsode.videoId === data.video.videoId) {
        return season;
      }
    }
  }

  return null;
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

  const episodes = seasons.filter((v) => v.name === season)[0]?.episodes || [];
  const total = episodes.length;
  const sliced = episodes.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const totalPage = Math.ceil(total / PAGE_SIZE);

  return {
    episodes: sliced,
    total,
    page,
    totalPage,
    setPage: (p: number) => setState({ page: p }),
  };
}

export function useVideoHistoryUpdator(videoId: string) {
  const videoHistorySetApi = useVideoHistorySetApi();

  const onTimeUpdate = useCallback(
    (time: number) => {
      videoHistorySetApi({
        videoId,
        time: Math.floor(time),
      });
    },
    [videoHistorySetApi, videoId]
  );

  return onTimeUpdate;
}

export function usePlayNextVideo() {
  const { entry, video } = useVideoDetailPageData();
  const episodes = useVideoDetailPageSeason()?.episodes ?? [];

  const index = episodes.findIndex((v) => v.videoId === video.videoId);
  const nextEpisode = episodes[index + 1];

  return () => {
    if (nextEpisode) {
      router.navigate(VideoRoutes.detail({ entryId: entry.id, videoId: nextEpisode.videoId, autoplay: true }));
    }
  };
}
