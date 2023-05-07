import { ToastContainer } from 'react-bootstrap';

import ApiErrorToast from './ApiErrorToast';
import { useSelector } from 'src/redux';

export default function ToastDisplay() {
  const { list } = useSelector((s) => s.toast);

  const toasts = list.map((info) => <ApiErrorToast key={info.millis + info.content} info={info} />);

  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts}
    </ToastContainer>
  );
}
