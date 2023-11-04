import { useContext } from 'react';

import { useVideoSort } from '../VideoListHooks';
import ButtonListModal, { ButtonListModalItem } from 'src/components/common/ButtonListModal';
import { VideoSort } from 'src/model/video';
import { VideoListContext } from 'src/pages/video/list/VideoListState';

export default function VideoSortModal() {
  const [state, setState] = useContext(VideoListContext);
  const { sort, setSort, getSortName } = useVideoSort();
  const { showSortModal } = state;

  const onHide = () => {
    setState({ showSortModal: false });
  };

  const onClick = (v: VideoSort) => {
    setState({ showSortModal: false });
    setSort(v);
  };

  const items: ButtonListModalItem[] = VideoSort.values().map((v) => ({
    title: getSortName(v),
    active: sort === v,
    onClick: () => onClick(v),
  }));

  return <ButtonListModal className="VideoSortModal" show={showSortModal} onHide={onHide} items={items} />;
}
