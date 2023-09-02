import { Pagination } from 'react-bootstrap';

import { useBreakpointMobile } from 'src/utils/breakpoint';

interface PaginationProps {
  now: number;
  total: number;
  onClick: (page: number) => void;
}

export default function CommonPagination({ now, total, onClick }: PaginationProps) {
  const isMobile = useBreakpointMobile();
  const size = isMobile ? 5 : 10;

  const min = Math.floor(now / size) * size;
  const max = (Math.floor(now / size) + 1) * size;
  const length = Math.min(max, total) - min;

  const pages = Array.from({ length }, (_, i) => i + min);

  const elements = pages.map((i) => (
    <Pagination.Item key={i} active={i === now} onClick={() => onClick(i)}>
      {i + 1}
    </Pagination.Item>
  ));

  if (total <= 1) {
    return <></>;
  }

  const arrowExist = total > size;

  return (
    <div className="CommonPagination d-flex flex_center">
      <Pagination className="mb-0">
        {arrowExist && <Pagination.First onClick={() => onClick(0)} />}
        {arrowExist && <Pagination.Prev onClick={() => onClick(min - 1)} />}
        {elements}
        {arrowExist && <Pagination.Next onClick={() => onClick(max)} />}
        {arrowExist && <Pagination.Last onClick={() => onClick(total - 1)} />}
      </Pagination>
    </div>
  );
}
