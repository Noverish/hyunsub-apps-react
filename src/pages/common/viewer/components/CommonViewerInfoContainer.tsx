import cs from 'classnames';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import { CommonViewerStateContext } from '../CommonViewerStateContext';

interface Props {
  children: React.ReactNode;
}

export default function CommonViewerInfoContainer({ children }: Props) {
  const [{ showInfo: show }, setState] = useContext(CommonViewerStateContext);

  const hide = () => {
    setState({ showInfo: false });
  };

  return (
    <div className={cs('CommonViewerInfoContainer', { show })}>
      <div className="close_btn flex_center" onClick={hide}>
        <i className="fas fa-times" />
      </div>
      <Container>{children}</Container>
    </div>
  );
}