import { generateQuery } from '../generate-api';
import { DutchRecordMember } from 'src/model/dutch';

interface DutchRecordMembersParams {
  recordId: string;
}

const dutchRecordMembersApi = generateQuery<DutchRecordMembersParams, DutchRecordMember[]>({
  api: ({ recordId }) => ({
    url: `/api/v1/records/${recordId}/members`,
    method: 'GET',
  }),
  key: 'dutchRecordMembersApi',
});

export default dutchRecordMembersApi;
