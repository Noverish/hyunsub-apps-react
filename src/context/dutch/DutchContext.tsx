import { createContext } from 'react';

import dutchMembersApi from 'src/api/dutch/dutch-members';
import { useUrlParams } from 'src/hooks/url-params';
import { DutchMember } from 'src/model/dutch';

interface Props {
  children: React.ReactNode;
}

export interface DutchState {
  tripId: string;
  members: DutchMember[];
}

const initialState: DutchState = {
  tripId: '',
  members: [],
};

export const DutchContext = createContext<DutchState>(initialState);

export const DutchProvider = ({ children }: Props) => {
  const [tripId] = useUrlParams('tripId');

  const { data } = dutchMembersApi.useApiResult({ tripId });

  const state: DutchState = {
    tripId,
    members: data ?? [],
  };

  return <DutchContext.Provider value={state}>{children}</DutchContext.Provider>;
};
