import { generateApi } from 'src/api/generate-api';

export interface EntryRenameParams {
  entryId: string;
  from: string;
  to: string;
}

const entryRenameApi = generateApi<EntryRenameParams, any>(({ entryId, ...data }) => ({
  url: `/api/v1/entries/${entryId}/manage/rename`,
  method: 'POST',
  data,
}));

export default entryRenameApi;
