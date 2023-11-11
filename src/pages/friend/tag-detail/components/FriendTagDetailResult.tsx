import friendTagFriendsApi from 'src/api/friend/friend-tag-friends';
import CommonSearchResult from 'src/components/common/search/CommonSearchResult';
import FriendPreviewItem from 'src/components/friend/FriendPreviewItem';
import { FriendPreview } from 'src/model/friend';

interface Props {
  tag: string;
}

export default function FriendTagDetailResult({ tag }: Props) {
  return (
    <CommonSearchResult
      searchFn={({ page }) => friendTagFriendsApi.useApiResult({ tag, p: page })}
      renderItem={renderItem}
      renderTotal
    />
  );
}

function renderItem(v: FriendPreview) {
  return <FriendPreviewItem key={v.id} friend={v} />;
}
