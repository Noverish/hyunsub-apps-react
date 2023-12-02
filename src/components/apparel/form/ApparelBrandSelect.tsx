import { Control, useController } from 'react-hook-form';

import apparelBrandsApi from 'src/api/apparel/apparel-brands';
import SimpleCreatableSelect from 'src/components/common/select/SimpleCreatableSelect';
import { ApparelInfo } from 'src/model/apparel';

interface Props {
  control: Control<ApparelInfo>;
}

export default function ApparelBrandSelect({ control }: Props) {
  const { data, isLoading } = apparelBrandsApi.useApiResult({});
  const { field } = useController({ name: 'brand', control });
  const { onChange, value } = field;

  return <SimpleCreatableSelect data={data ?? []} value={value} onChange={onChange} isLoading={isLoading} />;
}
