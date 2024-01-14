import { Control, useController } from 'react-hook-form';

import CustomDropdown from '../../common/select/CustomDropdown';
import { DutchRecordParams, dutchCurrencyList } from 'src/model/dutch';

interface Props {
  control: Control<DutchRecordParams>;
}

export default function DutchCurrencyDropdown({ control }: Props) {
  const { field } = useController({ name: 'currency', control });
  const { onChange } = field;

  return (
    <CustomDropdown
      data={dutchCurrencyList}
      labelSelector={(v) => v}
      onSelect={(v) => onChange(v)}
      value={field.value}
    />
  );
}
