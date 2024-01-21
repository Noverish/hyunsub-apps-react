import cs from 'classnames';
import { PropsWithChildren } from 'react';

import './CommonDescription.scss';

interface Props {
  label: string;
  value?: string;
  noTopMargin?: boolean;
}

export default function CommonDescription(props: PropsWithChildren<Props>) {
  const { label, value, children, noTopMargin } = props;

  return (
    <div className={cs('CommonDescription', { noTopMargin })}>
      <label>{label}</label>
      {children ?? <div className="value">{value}</div>}
    </div>
  );
}
