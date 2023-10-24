import { Control, useController } from 'react-hook-form';

import SimpleCreatableMultiSelect from '../common/select/SimpleCreatableMultiSelect';
import { Friend } from 'src/model/friend';

interface Props {
  control: Control<Friend, any>;
}

export default function FriendTagSelect({ control }: Props) {
  const { field } = useController({ name: 'tags', control });
  const { onChange, value } = field;

  return <SimpleCreatableMultiSelect data={[]} value={value} onChange={onChange} />;
}
