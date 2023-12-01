import { generateApi } from 'src/api/generate-api';

export interface EntryScanParams {
  entryId: string;
}

const entryScanApi = generateApi<EntryScanParams, any>({
  api: ({ entryId }) => ({
    url: `/api/v1/entries/${entryId}/manage/scan`,
    method: 'POST',
  }),
});

export default entryScanApi;
