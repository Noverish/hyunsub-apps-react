import { generateApi } from 'src/api/generate-api';

export interface EntryRenameParams {
  entryId: string;
  from: string;
  to: string;
}

const entryRenameApi = generateApi<EntryRenameParams, any>({
  api: (params: EntryRenameParams) => ({
    url: `/api/v1/entries/${params.entryId}/manage/rename`,
    method: 'POST',
    data: params,
  }),
});

export default entryRenameApi;
