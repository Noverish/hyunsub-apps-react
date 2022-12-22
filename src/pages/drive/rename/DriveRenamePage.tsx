import DriveContainer from 'src/components/drive/DriveContainer';
import DriveHeader from 'src/components/drive/DriveHeader';
import DriveRenameFileList from 'src/components/drive/DriveRenameFileList';

import './DriveRenamePage.scss';

export default function DriveRenamePage() {
  return (
    <div id="DriveRenamePage">
      <DriveHeader title="Drive" />
      <DriveContainer>
        <DriveRenameFileList />
      </DriveContainer>
    </div>
  )
}
