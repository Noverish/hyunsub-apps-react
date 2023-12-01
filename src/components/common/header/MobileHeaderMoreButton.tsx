import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';

import { HeaderMoreButton } from 'src/model/component';

interface ButtonProps {
  onClick: () => void;
}

const Toggle = forwardRef<HTMLElement, ButtonProps>(({ onClick }, ref) => (
  <i className="fas fa-ellipsis-h" ref={ref} onClick={onClick} />
));

interface Props {
  menus: HeaderMoreButton[];
}

export default function MobileHeaderMoreButton({ menus }: Props) {
  const items = menus.map((v) => (
    <Dropdown.Item key={v.text} onClick={v.onClick}>
      {v.text}
    </Dropdown.Item>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={Toggle} />
      <Dropdown.Menu>{items}</Dropdown.Menu>
    </Dropdown>
  );
}
