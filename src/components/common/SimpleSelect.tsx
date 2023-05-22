import { ActionMeta, SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface Option {
  value: string;
  label: string;
}

export interface SimpleSelectProps {
  data: string[];
  onSelect?: (value?: string) => void;
  isInvalid?: boolean;
  value?: string;
}

export default function SimpleSelect(props: SimpleSelectProps) {
  const onSelectChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    props.onSelect?.(newValue?.value);
  };

  const data: Option[] = (props.data || []).map((v) => ({ value: v, label: v }));

  const value = data.filter(v => v.value === props.value)[0];

  return (
    <CreatableSelect
      classNamePrefix="select"
      className={props.isInvalid ? 'is-invalid' : ''}
      menuPortalTarget={window.document.body}
      isClearable
      isSearchable
      options={data}
      onChange={onSelectChange}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 1100 }) }}
      value={value}
    />
  );
}
