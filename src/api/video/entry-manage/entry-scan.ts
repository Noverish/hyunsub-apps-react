import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';

export interface EntryScanParams {
  entryId: string;
}

const entryScanApi = generateApi<EntryScanParams, SimpleResponse>({
  api: ({ entryId }) => ({
    url: `/api/v1/entries/${entryId}/manage/scan`,
    method: 'POST',
  }),
});

export default entryScanApi;
