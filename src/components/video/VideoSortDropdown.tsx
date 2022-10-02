import { VideoSort } from "src/model/video";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const getVideoSortName = (sort: VideoSort): any => {
  switch (sort) {
    case VideoSort.random: return 'video.term.sort.random';
    case VideoSort.new: return 'video.term.sort.new';
    case VideoSort.old: return 'video.term.sort.old';
    case VideoSort.abc: return 'video.term.sort.abc';
    case VideoSort.zyx: return 'video.term.sort.zyx';
  }
}

interface Props {
  sort?: VideoSort;
}

export default function VideoSortDropdown(props: Props) {
  const sort = props.sort || VideoSort.random;
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onSelect = (key: string | null) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', key || '');
    navigate(window.location.pathname + '?' + params.toString());
  };

  const items = [VideoSort.random, VideoSort.new, VideoSort.old, VideoSort.abc, VideoSort.zyx].map(v => (
    <Dropdown.Item
      key={v}
      as='button'
      active={sort === v}
      eventKey={v}
    >
      {t(getVideoSortName(v))}
    </Dropdown.Item>
  ))

  return (
    <Dropdown className="mb-3" onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">{t(getVideoSortName(sort))}</Dropdown.Toggle>
      <Dropdown.Menu>
        {items}
      </Dropdown.Menu>
    </Dropdown>
  )
}
