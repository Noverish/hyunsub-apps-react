import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';

export interface EntryRenameParams {
  entryId: string;
  from: string;
  to: string;
}

const entryRenameApi = generateApi<EntryRenameParams, SimpleResponse>({
  api: (params: EntryRenameParams) => ({
    url: `/api/v1/entries/${params.entryId}/manage/rename`,
    method: 'POST',
    data: params,
  }),
});

export default entryRenameApi;
