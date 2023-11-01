import FriendPreviewItem from './FriendPreviewItem';
import { FriendPreview } from 'src/model/friend';

interface Props {
  list: FriendPreview[];
}

export default function FriendPreviewList(props: Props) {
  const items = props.list.map((v) => <FriendPreviewItem key={v.id} friend={v} />);

  return <div className="FriendPreviewList d-grid gap-3">{items}</div>;
}
