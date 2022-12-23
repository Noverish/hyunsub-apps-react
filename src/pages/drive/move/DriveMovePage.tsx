import { useEffect } from 'react';
import DriveContainer from 'src/components/drive/DriveContainer';
import DriveFileList from 'src/components/drive/DriveFileList';
import DriveHeader from 'src/components/drive/DriveHeader';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';

import './DriveMovePage.scss';

export default function DriveMovePage() {
  const { path: path1 } = useDriveStatus();
  const { path: path2 } = useDriveStatus(1);

  useEffect(() => {
    window.document.title = `${path1} - ${path2}`;
  }, [path1, path2]);

  return (
    <div id="DriveMovePage">
      <DriveHeader title="Drive" />
      <DriveContainer>
        <DriveFileList index={0} />
        <DriveFileList index={1} />
      </DriveContainer>
    </div>
  )
}
