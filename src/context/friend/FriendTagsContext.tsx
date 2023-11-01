import { createContext } from 'react';

import friendTagListApi from 'src/api/friend/friend-tag-list';
import { FriendTagPreview } from 'src/model/friend';

interface Props {
  children: React.ReactNode;
}

interface State {
  tags: FriendTagPreview[];
  isLoading: boolean;
}

const initialState: State = {
  tags: [],
  isLoading: true,
};

export const FriendTagsContext = createContext<State>(initialState);

export const FriendTagsProvider = ({ children }: Props) => {
  const { data, isLoading } = friendTagListApi.useApiResult({});

  const state = {
    tags: data ?? [],
    isLoading,
  };

  return <FriendTagsContext.Provider value={state}>{children}</FriendTagsContext.Provider>;
};
