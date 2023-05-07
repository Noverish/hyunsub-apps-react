import { useContext, useEffect } from 'react';
import driveListApi from 'src/api/drive/drive-list';
import DriveFileListBreadcrumb from 'src/components/drive/explorer/DriveExplorerBreadcrumb';
import { useDriveExplorerPath, useDriveExplorerSelectChange } from 'src/components/drive/explorer/DriveExplorerHooks';
import DriveRenameModal from 'src/components/drive/rename/DriveRenameModal';
import DriveViewerModal from 'src/components/drive/viewer/DriveViewerModal';
import './DriveExplorer.scss';
import DriveExplorerFileList from "./DriveExplorerFileList";
import DriveExplorerMenu from "./DriveExplorerMenu";
import DriveUploadModal from '../upload/DriveUploadModal';
import { DriveUploadContext } from '../upload/DriveUploadContext';

export default function DriveExplorer() {
  const [path] = useDriveExplorerPath();
  const { data: files } = driveListApi.useApiResult({ path });
  const { clearSelects } = useDriveExplorerSelectChange();
  const [{ items }] = useContext(DriveUploadContext);

  useEffect(() => {
    clearSelects();
  }, [path, clearSelects]);

  return (
    <div className="DriveExplorer">
      <DriveFileListBreadcrumb />
      <DriveExplorerMenu files={files} />
      <DriveExplorerFileList files={files} />
      <DriveRenameModal />
      <DriveViewerModal />
      {items.length > 0 && <DriveUploadModal />}
    </div>
  )
}
