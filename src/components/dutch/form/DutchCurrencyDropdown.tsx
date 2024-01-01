import { Control, useController } from 'react-hook-form';

import CustomDropdown from '../../common/select/CustomDropdown';
import { DutchRecordCreateParams } from 'src/api/dutch/dutch-record-create';
import { dutchCurrencyList } from 'src/model/dutch';

interface Props {
  control: Control<DutchRecordCreateParams>;
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
