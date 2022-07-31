import { VideoSort } from "src/model/video";
import Dropdown from 'react-bootstrap/Dropdown';

const getVideoSortName = (sort: VideoSort) => {
  switch(sort) {
    case VideoSort.random: return '랜덤순';
    case VideoSort.new: return '최신 업로드순';
    case VideoSort.old: return '오래된 업로드순';
    case VideoSort.abc: return '가나다순';
    case VideoSort.zyx: return '가나다역순';
  }
}

export default function VideoSortDropdown() {
  const sort = (new URLSearchParams(window.location.search).get('sort') || VideoSort.random) as VideoSort;

  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle variant="secondary">{getVideoSortName(sort)}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item active={sort === VideoSort.random} href="#" data-sort={VideoSort.random}>{getVideoSortName(VideoSort.random)}</Dropdown.Item>
        <Dropdown.Item active={sort === VideoSort.new} href="#" data-sort={VideoSort.new}>{getVideoSortName(VideoSort.new)}</Dropdown.Item>
        <Dropdown.Item active={sort === VideoSort.old} href="#" data-sort={VideoSort.old}>{getVideoSortName(VideoSort.old)}</Dropdown.Item>
        <Dropdown.Item active={sort === VideoSort.abc} href="#" data-sort={VideoSort.abc}>{getVideoSortName(VideoSort.abc)}</Dropdown.Item>
        <Dropdown.Item active={sort === VideoSort.zyx} href="#" data-sort={VideoSort.zyx}>{getVideoSortName(VideoSort.zyx)}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
