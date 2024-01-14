import FriendPreviewItem from './FriendPreviewItem';
import { FriendPreview } from 'src/model/friend';

interface Props {
  friends: FriendPreview[];
}

export default function FriendPreviewList({ friends }: Props) {
  const elements = friends.map((v) => <FriendPreviewItem key={v.id} friend={v} />);

  return <div className="FriendPreviewList d-grid gap-3">{elements}</div>;
}
