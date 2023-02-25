import { useContext } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { VideoSort } from 'src/model/video';
import { VideoListContext } from 'src/pages/video/list/VideoListState';
import { useVideoSort } from '../VideoListHook';

export default function VideoSortModal() {
  const [state, setState] = useContext(VideoListContext);
  const { sort, setSort, getSortName } = useVideoSort();
  const { showSortModal } = state;

  const onHide = () => {
    setState({ showSortModal: false });
  }

  const onClick = (v: VideoSort) => () => {
    setState({ showSortModal: false });
    setSort(v);
  }

  const sorts = [VideoSort.random, VideoSort.new, VideoSort.old, VideoSort.abc, VideoSort.zyx];
  const items = sorts.map(v => (
    <ListGroup.Item
      key={v}
      as='button'
      active={sort === v}
      eventKey={v}
      onClick={onClick(v)}
    >
      {getSortName(v)}
    </ListGroup.Item>
  ))

  return (
    <Modal className="VideoSortModal" show={showSortModal} centered onHide={onHide}>
      <Modal.Body className="p-0">
        <ListGroup variant="flush">
          {items}
        </ListGroup>
      </Modal.Body>
    </Modal>
  )
}
