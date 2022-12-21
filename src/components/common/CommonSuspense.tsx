import { ReactNode, Suspense } from "react";
import { Spinner } from 'react-bootstrap';

interface Props {
  enable?: boolean;
  children?: ReactNode | undefined;
}

export function CommonSuspenseFallback() {
  return (
    <div className="CommonSuspenseFallback flex_center">
      <Spinner animation="border"></Spinner>
    </div>
  )
}

export default function CommonSuspense({ enable, children }: Props) {
  if (enable) {
    return <CommonSuspenseFallback />
  }

  return (
    <Suspense fallback={<CommonSuspenseFallback />}>
      {children}
    </Suspense>
  )
}
