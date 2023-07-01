import { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';

import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailContext';
import { useVideoDetailPageData } from 'src/pages/video/detail/VideoDetailHooks';

export default function VideoSeasonDropdown() {
  const { seasons } = useVideoDetailPageData();
  const [state, setState] = useContext(VideoDetailContext);
  const { season } = state;

  if (!seasons) {
    return <></>;
  }

  const seasonNames = seasons.map((v) => v.name as string).filter((v) => !!v);
  if (seasonNames.length === 0) {
    return <></>;
  }

  const items = seasonNames.sort().map((v) => (
    <NavDropdown.Item key={v} active={v === season} as="button" eventKey={v}>
      {v}
    </NavDropdown.Item>
  ));

  const onSelect = (newSeason: string | null) => {
    if (newSeason !== null) {
      setState({ season: newSeason, page: 0 });
    }
  };

  return (
    <NavDropdown title={season} onSelect={onSelect} className="VideoSeasonDropdown">
      {items}
    </NavDropdown>
  );
}
