import { useContext } from 'react';

import { PhotoSelectContext } from './PhotoSelectContext';
import { PhotoPreview } from 'src/model/photo';
import { useContextSetter } from 'src/utils/context';

function useSelect(previews: PhotoPreview[]) {
  const [state, setState] = useContext(PhotoSelectContext);

  const { selects, lastSelected } = state;

  return (preview: PhotoPreview, shiftKey: boolean) => {
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
      setState((s) => {
        s.selects.push(preview);
        s.lastSelected = preview;
      });
    } else {
      setState((s) => {
        s.selects.splice(index, 1);
        s.lastSelected = undefined;
      });
    }
  };
}

function useToggle() {
  const [{ selectMode }, setState] = useContext(PhotoSelectContext);

  return () => {
    if (selectMode) {
      setState({
        selectMode: false,
        selects: [],
        lastSelected: undefined,
      });
    } else {
      setState({
        selectMode: true,
      });
    }
  };
}

function useClear() {
  const setState = useContextSetter(PhotoSelectContext);

  return () => {
    setState({
      selectMode: false,
      selects: [],
      lastSelected: undefined,
    });
  };
}

const PhotoSelectHooks = {
  useSelect,
  useToggle,
  useClear,
};

export default PhotoSelectHooks;
