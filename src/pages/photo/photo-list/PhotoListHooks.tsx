import { useState, useContext } from 'react';
import { PhotoPreview } from "src/model/photo";
import { PhotoListContext } from 'src/pages/photo/photo-list/PhotoListState';

export function usePhotoListSelect(previews: PhotoPreview[]) {
  const [state, setState] = useContext(PhotoListContext);
  const [lastSelected, setLastSelected] = useState<PhotoPreview | undefined>();
  const { selectMode, selects } = state;

  const onSelect = (preview: PhotoPreview, shiftKey: boolean) => {
    const index = selects.indexOf(preview);

    if (index < 0 && shiftKey && lastSelected) {
      const index1 = previews.indexOf(preview);
      const index2 = previews.indexOf(lastSelected);
      const [start, end] = [index1, index2].sort((a, b) => a - b);
      const list = previews.slice(start, end + 1);
      const set = new Set([...selects, ...list]);
      setState({ selects: Array.from(set) });
      return;
    }

    if (index < 0) {
      selects.push(preview);
      setLastSelected(preview);
    } else {
      selects.splice(index, 1);
      setLastSelected(undefined);
    }

    setState({ selects: [...selects] });
  }

  const toggleSelectMode = () => setState({ selectMode: !selectMode });

  const onCancel = () => {
    setLastSelected(undefined);
    setState({
      selectMode: false,
      selects: [],
    })
  };

  return { selects, onSelect, selectMode, toggleSelectMode, onCancel };
}
