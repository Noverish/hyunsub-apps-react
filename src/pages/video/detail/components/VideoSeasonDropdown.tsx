import { Dropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailState';
import { useLoadVideoDetailPage } from 'src/pages/video/detail/VideoDetailHooks';

export default function VideoSeasonDropdown() {
  const { seasons } = useLoadVideoDetailPage();
  const [state, setState] = useContext(VideoDetailContext);
  const { season } = state;

  if (!seasons) {
    return <></>;
  }

  const seasonNames = seasons.map(v => v.name as string).filter(v => !!v);
  if (seasonNames.length === 0) {
    return <></>;
  }

  const items = seasonNames.sort().map(v => (
    <Dropdown.Item key={v} active={v === season} as='button' eventKey={v}>{v}</Dropdown.Item>
  ))

  const onSelect = (newSeason: string | null) => {
    if (newSeason !== null) {
      setState({ season: newSeason, page: 0 });
    }
  };

  return (
    <Dropdown onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">{season}</Dropdown.Toggle>
      <Dropdown.Menu>
        {items}
      </Dropdown.Menu>
    </Dropdown>
  )
}
