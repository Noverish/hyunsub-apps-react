import { Col, Row } from "react-bootstrap";
import photoListApi from 'src/api/photo/photo-list';
import { useScrollBottom } from 'src/utils';
import flatten from 'lodash/flatten';

interface Props {

}

export default function PhotoListView(props: Props) {
  const { data, fetchNextPage, isFetching } = photoListApi.useInfiniteApi({});

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const photos = flatten(data?.pages.map(v => v.data) ?? []);

  const elements = photos.map(v => (
    <Col key={v.id}>
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={v.thumbnail} alt={v.id} />
      </div>
    </Col>
  ));

  return (
    <div className="PhotoListComp">
      <Row className="g-1 row-cols-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-6">
        {elements}
      </Row>
    </div>
  )
}
