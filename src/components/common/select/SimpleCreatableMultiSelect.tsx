import { ActionMeta, MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface Option {
  value: string;
  label: string;
}

export interface SimpleCreatableMultiSelectProps {
  data: string[];
  value: string[];
  onChange: (value: string[]) => void;
  isInvalid?: boolean;
}

export default function SimpleCreatableMultiSelect(props: SimpleCreatableMultiSelectProps) {
  const data: Option[] = props.data.map((v) => ({ value: v, label: v }));
  const value: Option[] = props.value.map((v) => ({ value: v, label: v }));

  const onChange = (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    props.onChange(newValue.map((v) => v.value));
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
      isMulti={true}
    />
  );
}
