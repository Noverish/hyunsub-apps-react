import { generateQuery } from '../generate-api';
import { DutchMember } from 'src/model/dutch';

interface DutchMembersParams {
  tripId: string;
}

const dutchMembersApi = generateQuery<DutchMembersParams, DutchMember[]>({
  api: ({ tripId }) => ({
    url: `/api/v1/trips/${tripId}/members`,
    method: 'GET',
  }),
  key: 'dutchMembersApi',
});

export default dutchMembersApi;
