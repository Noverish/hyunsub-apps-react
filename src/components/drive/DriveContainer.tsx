import { isMobile } from 'src/utils/user-agent';
import cs from 'classnames';

import './DriveContainer.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {

}

export default function DriveContainer({ children, className, ...etc }: Props) {
  const className1 = isMobile() ? 'is_mobile' : 'is_desktop';

  return (
    <div id="DriveContainer" className={cs(className, className1)}>
      {children}
    </div>
  )
}
