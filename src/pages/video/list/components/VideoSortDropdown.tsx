import Dropdown from 'react-bootstrap/Dropdown';
import { VideoSort } from "src/model/video";
import { useVideoSort } from 'src/pages/video/list/VideoListHook';

export default function VideoSortDropdown() {
  const { sort, setSort, getSortName } = useVideoSort();

  const onSelect = (key: string | null) => {
    setSort(key as VideoSort);
  };

  const items = [VideoSort.random, VideoSort.new, VideoSort.old, VideoSort.abc, VideoSort.zyx].map(v => (
    <Dropdown.Item
      key={v}
      as='button'
      active={sort === v}
      eventKey={v}
    >
      {getSortName(v)}
    </Dropdown.Item>
  ))

  return (
    <Dropdown className="mb-3" onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">{getSortName(sort)}</Dropdown.Toggle>
      <Dropdown.Menu>
        {items}
      </Dropdown.Menu>
    </Dropdown>
  )
}
