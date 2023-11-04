import cs from 'classnames';

import './SelectIndicator.scss';

interface Props {
  enable?: boolean;
  selected?: boolean;
  onSelect?: (nextState: boolean, e: React.MouseEvent<HTMLElement>) => void;
}

export default function SelectIndicator({ enable, selected, onSelect }: Props) {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect?.(!selected, e);
  };

  const iconClassName = selected ? 'fas fa-check-circle' : 'far fa-circle';

  if (!enable) {
    return <></>;
  }

  return (
    <div className={cs('SelectIndicator', { selected })} onClick={onClick}>
      <i className={iconClassName} />
    </div>
  );
}
