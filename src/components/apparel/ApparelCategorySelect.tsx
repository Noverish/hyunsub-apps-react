import SimpleSelect from '../common/select/SimpleSelect';
import apparelCategoriesApi from 'src/api/apparel/apparel-categories';
import { SimpleSelectProps } from 'src/components/common/select/SimpleSelect';

type Props = Omit<SimpleSelectProps, 'data'>;

export default function ApparelCategorySelect(props: Props) {
  const result = apparelCategoriesApi.useApiResult({});

  return <SimpleSelect {...props} data={result.data || []} />;
}
