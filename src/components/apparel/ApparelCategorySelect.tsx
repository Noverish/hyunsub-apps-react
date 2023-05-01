import apparelCategoriesApi from 'src/api/apparel/apparel-categories';
import { SimpleSelectProps } from 'src/components/common/SimpleSelect';
import SimpleSelect from '../common/SimpleSelect';

type Props = Omit<SimpleSelectProps, 'data'>

export default function ApparelCategorySelect(props: Props) {
  const result = apparelCategoriesApi.useApiResult({});

  return (
    <SimpleSelect
      {...props}
      data={result.data || []}
    />
  )
}
