import Select, { ActionMeta, SingleValue } from 'react-select';

interface Option<T> {
  label: string;
  value: T;
}

export interface CustomSelectProps<T> {
  data: T[];
  labelSelector: (t: T) => string;
  onSelect: (value?: T) => void;
  value?: T;
  isInvalid?: boolean;
}

export default function CustomSelect<T>(props: CustomSelectProps<T>) {
  const convert = (v: T): Option<T> => ({
    label: props.labelSelector(v),
    value: v,
  });

  const onChange = (newValue: SingleValue<Option<T>>, actionMeta: ActionMeta<Option<T>>) => {
    props.onSelect(newValue?.value);
  };

  const options = props.data.map((v) => convert(v));
  const value = props.value ? convert(props.value) : undefined;

  return (
    <Select
      classNamePrefix="select"
      className={props.isInvalid ? 'is-invalid' : ''}
      menuPortalTarget={window.document.body}
      isClearable
      isSearchable
      options={options}
      onChange={onChange}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 1100 }) }}
      value={value}
    />
  );
}
