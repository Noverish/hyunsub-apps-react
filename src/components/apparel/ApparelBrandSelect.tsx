import apparelBrandsApi from 'src/api/apparel/apparel-brands';
import { SimpleSelectProps } from 'src/components/common/SimpleSelect';
import SimpleSelect from '../common/SimpleSelect';

type Props = Omit<SimpleSelectProps, 'data'>

export default function ApparelBrandSelect(props: Props) {
  const result = apparelBrandsApi.useApiResult({});

  return (
    <SimpleSelect
      {...props}
      data={result.data || []}
    />
  )
}
