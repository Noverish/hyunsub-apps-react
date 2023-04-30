import { useEffect } from 'react';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DriveContainer from 'src/components/drive/DriveContainer';
import DriveFileList from 'src/components/drive/DriveFileList';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { setDocumentTitle } from 'src/utils/services';

import './DriveMovePage.scss';

export default function DriveMovePage() {
  const { path: path1 } = useDriveStatus();
  const { path: path2 } = useDriveStatus(1);

  useEffect(() => {
    setDocumentTitle(`${path1} - ${path2}`);
  }, [path1, path2]);

  return (
    <div id="DriveMovePage">
      <MobileHeader title="Drive" />
      <DriveContainer>
        <DriveFileList index={0} />
        <DriveFileList index={1} />
      </DriveContainer>
    </div>
  )
}
