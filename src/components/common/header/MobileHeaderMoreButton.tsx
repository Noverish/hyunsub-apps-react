import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';

interface ButtonProps {
  onClick: () => void;
}

const Toggle = forwardRef<HTMLDivElement, ButtonProps>(({ onClick }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className="header_btn icon"
  >
    <i className="fas fa-ellipsis-h" />
  </div>
));

export interface MobileHeaderMoreButtonMenu {
  text: string;
  onClick: () => void;
}

interface Props {
  menus: MobileHeaderMoreButtonMenu[];
}

export default function MobileHeaderMoreButton({ menus }: Props) {
  const items = menus.map(v => (
    <Dropdown.Item key={v.text} onClick={v.onClick}>{v.text}</Dropdown.Item>
  ))

  return (
    <Dropdown>
      <Dropdown.Toggle as={Toggle} />

      <Dropdown.Menu>
        {items}
      </Dropdown.Menu>
    </Dropdown>
  )
}
