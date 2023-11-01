import { useContext } from 'react';
import { Control, useController } from 'react-hook-form';

import SimpleCreatableMultiSelect from '../common/select/SimpleCreatableMultiSelect';
import { FriendTagsContext } from 'src/context/friend/FriendTagsContext';
import { Friend } from 'src/model/friend';

interface Props {
  control: Control<Friend, any>;
}

export default function FriendTagSelect({ control }: Props) {
  const { tags, isLoading } = useContext(FriendTagsContext);
  const { field } = useController({ name: 'tags', control });
  const { onChange, value } = field;
  const data = tags.map((v) => v.name);

  return <SimpleCreatableMultiSelect data={data} value={value} onChange={onChange} isLoading={isLoading} />;
}
