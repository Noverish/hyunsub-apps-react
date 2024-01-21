import { generateQuery } from '../generate-api';
import { DutchTripDetail } from 'src/model/dutch';

interface DutchTripDetailParams {
  tripId: string;
}

const dutchTripDetailApi = generateQuery<DutchTripDetailParams, DutchTripDetail | null>({
  api: ({ tripId }) => ({
    url: `/api/v1/trips/${tripId}`,
    method: 'GET',
  }),
  key: 'dutchTripDetailApi',
});

export default dutchTripDetailApi;
