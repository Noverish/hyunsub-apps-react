import { FriendPreview } from "src/model/friend";
import { generateQuery } from "../generate-api";

const friendListApi = generateQuery<{}, FriendPreview[]>({
  api: () => ({
    url: `/api/v1/friends`,
    method: 'GET',
    withCredentials: true,
  }),
  key: 'friendListApi',
  host: 'friend',
})

export default friendListApi;
