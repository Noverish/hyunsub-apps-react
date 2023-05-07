import Dropdown from 'react-bootstrap/Dropdown';

import { VideoSort } from 'src/model/video';
import { useVideoSort } from 'src/pages/video/list/VideoListHooks';

export default function VideoSortDropdown() {
  const { sort, setSort, getSortName } = useVideoSort();

  const onSelect = (key: string | null) => {
    setSort(VideoSort.parse(key));
  };

  const items = VideoSort.values().map((v) => (
    <Dropdown.Item key={v.name} as="button" active={sort === v} eventKey={v.name}>
      {getSortName(v)}
    </Dropdown.Item>
  ));

  return (
    <Dropdown className="mb-3" onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">{getSortName(sort)}</Dropdown.Toggle>
      <Dropdown.Menu>{items}</Dropdown.Menu>
    </Dropdown>
  );
}
