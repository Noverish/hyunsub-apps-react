import cs from 'classnames';
import { PropsWithChildren } from 'react';

import './CommonDescription.scss';

interface Props {
  label: string;
  value?: string;
  noTopMargin?: boolean;
  onEdit?: () => void;
}

export default function CommonDescription(props: PropsWithChildren<Props>) {
  const { label, value, children, noTopMargin, onEdit } = props;

  const onClick = () => {
    onEdit?.();
  };

  return (
    <div className={cs('CommonDescription', { noTopMargin, onEdit: !!onEdit })} onClick={onClick}>
      <label>
        <span>{label}</span>
        {onEdit && <i className="fas fa-pen" />}
      </label>
      {children ?? <div className="value">{value}</div>}
    </div>
  );
}
