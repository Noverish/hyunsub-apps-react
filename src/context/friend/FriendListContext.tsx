import { createContext } from 'react';

import friendListApi from 'src/api/friend/friend-list';
import { FriendPreview } from 'src/model/friend';

interface Props {
  children: React.ReactNode;
}

export const FriendListContext = createContext<FriendPreview[]>([]);

export const FriendListProvider = ({ children }: Props) => {
  const { data } = friendListApi.useApiResult({});

  return <FriendListContext.Provider value={data ?? []}>{children}</FriendListContext.Provider>;
};
