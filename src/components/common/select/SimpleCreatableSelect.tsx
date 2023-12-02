import { ActionMeta, SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface Option {
  value: string;
  label: string;
}

export interface SimpleCreatableSelectProps {
  data: string[];
  value?: string;
  onChange: (value?: string) => void;
  isInvalid?: boolean;
  isLoading?: boolean;
}

export default function SimpleCreatableSelect(props: SimpleCreatableSelectProps) {
  const data: Option[] = props.data.map((v) => ({ value: v, label: v }));
  const value: Option = data.filter((v) => v.value === props.value)[0];

  const onChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    props.onChange(newValue?.value);
  };

  return (
    <CreatableSelect
      classNamePrefix="select"
      className={props.isInvalid ? 'is-invalid' : ''}
      menuPortalTarget={window.document.body}
      isClearable
      isSearchable
      options={data}
      onChange={onChange}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 1100 }) }}
      value={value}
      isLoading={props.isLoading}
    />
  );
}
