import { PropsWithChildren, Suspense } from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
  isLoading?: boolean;
}

export function Loading({ vh }: { vh?: number }) {
  const height = `${vh ?? 70}vh`;

  return (
    <div className="LoadingSuspense flex_center" style={{ height }}>
      <Spinner animation="border"></Spinner>
    </div>
  );
}

export function Loading2({ isLoading, children }: PropsWithChildren<Props>) {
  if (isLoading) {
    return <Loading />;
  }

  return children;
}

export default function LoadingSuspense(props: PropsWithChildren<Props>) {
  if (props.isLoading) {
    return <Loading />;
  }

  return <Suspense fallback={<Loading />}>{props.children}</Suspense>;
}
