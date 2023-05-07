import { useContext } from 'react';

import { DriveRenameContext } from './DriveRenameContext';
import { useDriveExplorerContext } from 'src/components/drive/explorer/DriveExplorerHooks';

import './DriveRenameFileList.scss';

export default function DriveRenameFileList() {
  const {
    state: { selects },
  } = useDriveExplorerContext();
  const [{ renames }] = useContext(DriveRenameContext);

  const rows = selects.map((v, i) => (
    <tr key={v}>
      <td>{v}</td>
      <td>{renames[i]}</td>
    </tr>
  ));

  return (
    <table className="DriveRenameFileList">
      <thead>
        <tr>
          <th>from</th>
          <th>to</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
