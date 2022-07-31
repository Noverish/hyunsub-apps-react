import { VideoSort } from "src/model/video";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";

const getVideoSortName = (sort: VideoSort) => {
  switch(sort) {
    case VideoSort.random: return '랜덤순';
    case VideoSort.new: return '최신 업로드순';
    case VideoSort.old: return '오래된 업로드순';
    case VideoSort.abc: return '가나다순';
    case VideoSort.zyx: return '가나다역순';
  }
}

interface Props {
  sort?: VideoSort;
}

export default function VideoSortDropdown({ sort = VideoSort.random }: Props) {
  const navigate = useNavigate();

  const onSelect = (key: string | null) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', key || '');
    navigate(window.location.pathname + '?' + params.toString());
  };

  return (
    <Dropdown className="mb-3" onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">{getVideoSortName(sort)}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item active={sort === VideoSort.random} as='button' eventKey={VideoSort.random}>{getVideoSortName(VideoSort.random)}</Dropdown.Item>
        <Dropdown.Item active={sort === VideoSort.new} as='button' eventKey={VideoSort.new}>{getVideoSortName(VideoSort.new)}</Dropdown.Item>
        <Dropdown.Item active={sort === VideoSort.old} as='button' eventKey={VideoSort.old}>{getVideoSortName(VideoSort.old)}</Dropdown.Item>
        <Dropdown.Item active={sort === VideoSort.abc} as='button' eventKey={VideoSort.abc}>{getVideoSortName(VideoSort.abc)}</Dropdown.Item>
        <Dropdown.Item active={sort === VideoSort.zyx} as='button' eventKey={VideoSort.zyx}>{getVideoSortName(VideoSort.zyx)}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
