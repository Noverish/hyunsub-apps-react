import { PropsWithChildren, Suspense } from "react";
import { Spinner } from 'react-bootstrap';

interface Props {
  isLoading?: boolean;
}

export function Loading() {
  return (
    <div className="LoadingSuspense flex_center" style={{ height: '80vh' }}>
      <Spinner animation="border"></Spinner>
    </div>
  )
}

export default function LoadingSuspense(props: PropsWithChildren<Props>) {
  if (props.isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      {props.children}
    </Suspense>
  )
}
