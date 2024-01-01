import { t } from 'i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export interface CustomDropdownProps<T> {
  data: T[];
  labelSelector: (t: T) => string;
  onSelect: (value: T) => void;
  value?: T;
  noSelectionLabel?: string;
}

export default function CustomDropdown<T>(props: CustomDropdownProps<T>) {
  const { data, labelSelector, onSelect, value, noSelectionLabel } = props;

  const generateOnClick = (v: T) => () => {
    onSelect(v);
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

  return <DropdownButton title={title}>{items}</DropdownButton>;
}
