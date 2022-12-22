import cs from 'classnames';

import './DriveSectionTemplate.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
  title: string;
  btnBarChildren?: React.ReactNode;
}

export default function DriveSectionTemplate({ title, btnBarChildren, children, className, ...etc }: Props) {
  return (
    <div className={cs('DriveSectionTemplate', className)} {...etc} >
      <div className="top_bar">
        <span className="title">{title}</span>
        <div className="btn_bar">{btnBarChildren}</div>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  )
}
