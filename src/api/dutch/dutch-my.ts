import { generateQuery } from '../generate-api';
import { DutchMember } from 'src/model/dutch';

interface DutchMyParams {
  tripId: string;
}

const dutchMyApi = generateQuery<DutchMyParams, DutchMember | null>({
  api: ({ tripId }) => ({
    url: `/api/v1/trips/${tripId}/my`,
    method: 'GET',
  }),
  key: 'dutchMyApi',
});

export default dutchMyApi;
