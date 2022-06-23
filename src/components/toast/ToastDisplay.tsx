import { ToastContainer } from "react-bootstrap";
import { useSelector } from "src/redux";
import ApiErrorToast from "./ApiErrorToast";

export default function ToastDisplay() {
  const { list } = useSelector(s => s.toast);

  const toasts = list.map(info => (
    <ApiErrorToast key={info.millis + info.content} info={info} />
  ))

  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts}
    </ToastContainer>
  )
}
