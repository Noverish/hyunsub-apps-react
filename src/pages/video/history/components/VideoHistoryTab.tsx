import { useContext, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import { VideoHistoryContext } from '../VideoHistoryContext';
import { VideoCategoryContext } from 'src/context/video/VideoCategoryContext';

export default function VideoHistoryTab() {
  const categories = useContext(VideoCategoryContext);
  const [state, setState] = useContext(VideoHistoryContext);

  useEffect(() => {
    if (categories.length) {
      setState({ category: categories[0].name });
    }
  }, [setState, categories]);

  const onSelect = (category: string | null) => {
    if (category) {
      setState({ category });
    }
  };

  const tabs = categories.map((v) => <Tab key={v.name} eventKey={v.name} title={v.displayName} />);

  return (
    <Tabs className="VideoHistoryTab" activeKey={state.category} onSelect={onSelect}>
      {tabs}
    </Tabs>
  );
}
