import DriveContainer from 'src/components/drive/DriveContainer';
import DriveHeader from 'src/components/drive/DriveHeader';
import DriveRenameFileList from 'src/components/drive/DriveRenameFileList';
import { useEffect } from 'react';
import { usePath } from 'src/pages/drive/DriveHooks';

import './DriveRenamePage.scss';

export default function DriveRenamePage() {
  const [path] = usePath();

  useEffect(() => {
    window.document.title = path;
  }, [path]);

  return (
    <div id="DriveRenamePage">
      <DriveHeader title="Drive" />
      <DriveContainer>
        <DriveRenameFileList />
      </DriveContainer>
    </div>
  )
}
