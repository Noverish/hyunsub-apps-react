import { Control, useController } from 'react-hook-form';

import apparelCategoriesApi from 'src/api/apparel/apparel-categories';
import SimpleCreatableSelect from 'src/components/common/select/SimpleCreatableSelect';
import { ApparelInfo } from 'src/model/apparel';

interface Props {
  control: Control<ApparelInfo>;
}

export default function ApparelCategorySelect({ control }: Props) {
  const { data, isLoading } = apparelCategoriesApi.useApiResult({});
  const { field } = useController({ name: 'category', control });
  const { onChange, value } = field;

  return <SimpleCreatableSelect data={data ?? []} value={value} onChange={onChange} isLoading={isLoading} />;
}
