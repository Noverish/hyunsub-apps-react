import { useContext } from "react";
import { FriendListContext } from "src/context/friend/FriendListContext";
import { FriendPreview } from "src/model/friend";
import CustomMultiSelect from "../common/select/CustomMultiSelect";

interface Props {
  value: FriendPreview[];
  onSelect: (value: FriendPreview) => void;
  onRemove: (value: FriendPreview) => void;
}

export default function DiaryFriendMultiSelect(props: Props) {
  const friends = useContext(FriendListContext);

  return (
    <CustomMultiSelect
      data={friends}
      labelSelector={v => v.name}
      onSelect={props.onSelect}
      onRemove={props.onRemove}
      value={props.value}
    />
  )
}
