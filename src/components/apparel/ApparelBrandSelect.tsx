import SimpleSelect from '../common/select/SimpleSelect';
import apparelBrandsApi from 'src/api/apparel/apparel-brands';
import { SimpleSelectProps } from 'src/components/common/select/SimpleSelect';

type Props = Omit<SimpleSelectProps, 'data'>;

export default function ApparelBrandSelect(props: Props) {
  const result = apparelBrandsApi.useApiResult({});

  return <SimpleSelect {...props} data={result.data || []} />;
}
