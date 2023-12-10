import { t } from 'i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export interface CustomDropdownProps<T> {
  data: T[];
  labelSelector: (t: T) => string;
  onSelect: (value: T) => void;
  value?: T;
}

export default function CustomDropdown<T>(props: CustomDropdownProps<T>) {
  const { data, labelSelector, onSelect, value } = props;

  const generateOnClick = (v: T) => () => {
    onSelect(v);
  };

  const title = value ? labelSelector(value) : t('no-selection');

  const items = data.map((v) => <Dropdown.Item onClick={generateOnClick(v)}>{labelSelector(v)}</Dropdown.Item>);

  return <DropdownButton title={title}>{items}</DropdownButton>;
}
