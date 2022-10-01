import { Spinner } from 'react-bootstrap';

interface Props {
  isFetching: boolean;
}

export default function ListLoadingIndicator({ isFetching }: Props) {
  if (!isFetching) {
    return <></>;
  }

  return (
    <div className="flex_center" style={{ height: '8rem' }}>
      <Spinner animation="border"></Spinner>
    </div>
  )
}
