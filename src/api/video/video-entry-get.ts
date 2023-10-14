import { VideoEntry } from "src/model/video";
import { generateQuery } from "../generate-api";

export interface VideoEntryGetParams {
  entryId: string;
}

const videoEntryGetApi = generateQuery<VideoEntryGetParams, VideoEntry>({
  api: ({ entryId }) => ({
    url: `/api/v1/entries/${entryId}`,
    method: 'GET',
  }),
  key: 'videoEntryGetApi',
});

export default videoEntryGetApi;
