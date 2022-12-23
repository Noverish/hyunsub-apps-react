import DriveHeader from 'src/components/drive/DriveHeader';
import DriveContainer from 'src/components/drive/DriveContainer';
import DriveFileList from 'src/components/drive/DriveFileList';
import { usePath } from '../DriveHooks';
import { useEffect } from 'react';

import './DriveMovePage.scss';

export default function DriveMovePage() {
  const [path] = usePath();
  const [path2] = usePath(2);

  useEffect(() => {
    window.document.title = `${path} - ${path2}`;
  }, [path, path2]);

  return (
    <div id="DriveMovePage">
      <DriveHeader title="Drive" />
      <DriveContainer>
        <DriveFileList index={0} />
        <DriveFileList index={2} />
      </DriveContainer>
    </div>
  )
}
