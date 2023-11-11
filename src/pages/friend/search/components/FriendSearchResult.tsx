import friendSearchApi from 'src/api/friend/friend-search';
import CommonSearchResult from 'src/components/common/search/CommonSearchResult';
import FriendPreviewItem from 'src/components/friend/FriendPreviewItem';
import { FriendPreview } from 'src/model/friend';

interface Props {
  ignoreQuery?: boolean;
}

export default function FriendSearchResult({ ignoreQuery }: Props) {
  return (
    <CommonSearchResult
      searchFn={({ page, query }) => friendSearchApi.useApiResult({ page, query: ignoreQuery ? undefined : query })}
      renderItem={renderItem}
    />
  );
}

function renderItem(v: FriendPreview) {
  return <FriendPreviewItem key={v.id} friend={v} />;
}
