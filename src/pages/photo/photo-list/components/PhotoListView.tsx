import { Col, Row } from "react-bootstrap";
import photoListApi from 'src/api/photo/photo-list';
import { useScrollBottom } from 'src/utils';
import flatten from 'lodash/flatten';
import PhotoPreviewView from "src/components/photo/PhotoPreviewView";
import PhotoRoutes from "../../PhotoRoutes";

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
      <PhotoPreviewView preview={v} href={PhotoRoutes.photoViewer(v.id)} />
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
