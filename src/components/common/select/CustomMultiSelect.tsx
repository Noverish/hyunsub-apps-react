import Select, { ActionMeta, MultiValue } from 'react-select';

interface Option<T> {
  label: string;
  value: T;
}

export interface CustomMultiSelectProps<T> {
  data: T[];
  labelSelector: (t: T) => string;
  onSelect: (value: T) => void;
  onRemove: (value: T) => void;
  value: T[];
  isInvalid?: boolean;
}

export default function CustomMultiSelect<T>(props: CustomMultiSelectProps<T>) {
  const convert = (v: T): Option<T> => ({
    label: props.labelSelector(v),
    value: v,
  });

  const onChange = (newValue: MultiValue<Option<T>>, actionMeta: ActionMeta<Option<T>>) => {
    const action = actionMeta.action;
    if (action === 'select-option') {
      props.onSelect(actionMeta.option!!.value);
    } else if (action === 'remove-value') {
      props.onRemove(actionMeta.removedValue.value);
    }
  };

  const options = props.data.map((v) => convert(v));
  const value = props.value.map((v) => convert(v));

  return (
    <Select
      classNamePrefix="select"
      className={props.isInvalid ? 'is-invalid' : ''}
      menuPortalTarget={window.document.body}
      options={options}
      onChange={onChange}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 1100 }) }}
      value={value}
      isMulti={true}
    />
  );
}
