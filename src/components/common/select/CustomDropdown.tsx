import cs from 'classnames';
import { t } from 'i18next';
import { Dropdown } from 'react-bootstrap';

export interface CustomDropdownProps<T> {
  data: T[];
  labelSelector: (t: T) => string;
  onChange: (value: T) => void;
  value?: T;
  noSelectionLabel?: string;
  isInvalid?: boolean;
}

export default function CustomDropdown<T>(props: CustomDropdownProps<T>) {
  const { data, labelSelector, onChange, value, noSelectionLabel } = props;

  const generateOnClick = (v: T) => () => {
    onChange(v);
  };

  const title = value ? labelSelector(value) : noSelectionLabel ?? t('no-selection');

  const items = data.map((v) => {
    const label = labelSelector(v);
    return (
      <Dropdown.Item key={label} onClick={generateOnClick(v)}>
        {label}
      </Dropdown.Item>
    );
  });

  return (
    <Dropdown className={cs({ 'is-invalid': props.isInvalid })}>
      <Dropdown.Toggle>{title}</Dropdown.Toggle>
      <Dropdown.Menu className="position-fixed">{items}</Dropdown.Menu>
    </Dropdown>
  );
}
