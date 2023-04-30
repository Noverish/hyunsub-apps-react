import { useEffect } from 'react';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DriveContainer from 'src/components/drive/DriveContainer';
import DriveRenameFileList from 'src/components/drive/DriveRenameFileList';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { setDocumentTitle } from 'src/utils/services';

import './DriveRenamePage.scss';

export default function DriveRenamePage() {
  const { path } = useDriveStatus();

  useEffect(() => {
    setDocumentTitle(path);
  }, [path]);

  return (
    <div id="DriveRenamePage">
      <MobileHeader title="Drive" />
      <DriveContainer>
        <DriveRenameFileList />
      </DriveContainer>
    </div>
  )
}
