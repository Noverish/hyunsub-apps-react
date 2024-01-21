import { createContext } from 'react';

import dutchMembersApi from 'src/api/dutch/dutch-members';
import dutchTripDetailApi from 'src/api/dutch/dutch-trip-detail';
import { useUrlParams } from 'src/hooks/url-params';
import { DutchMember, DutchTripDetail } from 'src/model/dutch';

interface Props {
  children: React.ReactNode;
}

export interface DutchState {
  tripId: string;
  members: DutchMember[];
  trip?: DutchTripDetail | null;
}

const initialState: DutchState = {
  tripId: '',
  members: [],
};

export const DutchContext = createContext<DutchState>(initialState);

export const DutchProvider = ({ children }: Props) => {
  const [tripId] = useUrlParams('tripId');

  const { data: members } = dutchMembersApi.useApiResult({ tripId });
  const { data: trip } = dutchTripDetailApi.useApiResult({ tripId });

  const state: DutchState = {
    tripId,
    members: members ?? [],
    trip,
  };

  return <DutchContext.Provider value={state}>{children}</DutchContext.Provider>;
};
