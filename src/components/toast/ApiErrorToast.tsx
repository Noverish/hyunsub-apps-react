import { useEffect, useRef, useState } from 'react';
import { Toast } from 'react-bootstrap';

import { timeAgo } from 'src/i18n';
import { useDispatch } from 'src/redux';
import { ToastInfo, deleteToast, flushToast } from 'src/redux/toast';

const DELAY = 3000;

interface Props {
  info: ToastInfo;
}

export default function ApiErrorToast({ info }: Props) {
  const dispatch = useDispatch();
  const intervalRef = useRef<NodeJS.Timer>();
  const [time, setTime] = useState<string>(timeAgo.format(new Date(info.millis)).toString());

  const onClose = () => dispatch(deleteToast(info.millis));

  useEffect(() => {
    const interval = setInterval(() => {
      const tmp = timeAgo.format(new Date(info.millis)).toString();
      setTime(tmp);
    }, 1000);
    intervalRef.current = interval;
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [info.millis]);

  useEffect(() => {
    if (!info.show) {
      setTimeout(() => dispatch(flushToast()), 1000);
    }
  }, [dispatch, info.show]);

  return (
    <Toast bg="danger" onClose={onClose} show={info.show} delay={DELAY} autohide>
      <Toast.Header>
        <strong className="me-auto">Error</strong>
        <small>{time}</small>
      </Toast.Header>
      <Toast.Body>{info.content}</Toast.Body>
    </Toast>
  );
}
