import CommonContainer from '../header/CommonContainer';
import DesktopHeader from '../header/DesktopHeader';
import MobileHeader from '../header/MobileHeader';
import { HeaderProps } from 'src/model/component';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

interface Props extends HeaderProps {
  className: string;
  children?: React.ReactNode;
  containerOutside?: React.ReactNode;
}

export default function CommonLayout(props: Props) {
  const { className, children, containerOutside, ...headerProps } = props;

  setDocumentTitle(headerProps.title);

  const isMobile = useBreakpointMobile();

  return (
    <div className={className}>
      <MobileHeader {...headerProps} />
      <CommonContainer>
        {isMobile || <DesktopHeader {...headerProps} />}
        {children}
      </CommonContainer>
      {containerOutside}
    </div>
  );
}
