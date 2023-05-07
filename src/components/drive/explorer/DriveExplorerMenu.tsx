import { t } from 'i18next';
import { useMemo } from 'react';
import { Button } from 'react-bootstrap';

import { useDriveExplorerContext, useDriveExplorerSelectChange } from './DriveExplorerHooks';
import driveListApi from 'src/api/drive/drive-list';
import { useDriveFileDownload, useDriveFileRemove, useDriveNewFolder } from 'src/components/drive/explorer/DriveFileHooks';
import DriveUploadButton from 'src/components/drive/upload/DriveUploadButton';
import { DriveFileInfo } from 'src/model/drive';

import './DriveExplorerMenu.scss';

interface Props {
  files?: DriveFileInfo[];
}

export default function DriveExplorerMenu({ files }: Props) {
  // hooks
  const { path, selects, setState } = useDriveExplorerContext();
  const { clearSelects, changeSelects } = useDriveExplorerSelectChange();
  const driveFileRemove = useDriveFileRemove();
  const driveFileDownload = useDriveFileDownload();
  const driveNewFolder = useDriveNewFolder();

  // functions
  const onSquareClick = () => {
    if (!files) {
      return;
    }

    if (selects.length > 0) {
      clearSelects();
    } else {
      changeSelects(files.map((v) => v.name));
    }
  };

  const onRefresh = () => {
    driveListApi.clearCache({ path });
    clearSelects();
  };

  const onRename = () => {
    setState({ renameBulk: true });
  };

  const onMove = () => {
    window.alert('not yet supported!');
  };

  // elements
  const squareIcon = useMemo(() => {
    if (!files || files.length === 0 || selects.length === 0) {
      return 'far fa-square';
    }
    if (selects.length === files.length) {
      return 'fas fa-check-square';
    }
    return 'fas fa-minus-square';
  }, [files, selects]);

  const selectionMenus = (
    <>
      <div className="vr" />
      <Button variant="primary" onClick={onRename}>
        <i className="fas fa-pen" />
      </Button>
      <Button variant="primary" onClick={onMove}>
        <i className="fas fa-exchange-alt" />
      </Button>
      <Button variant="primary" onClick={driveFileDownload}>
        <i className="fas fa-download" />
      </Button>
      <Button variant="danger" onClick={driveFileRemove}>
        <i className="fas fa-trash" />
      </Button>
      <span>{t('drive.preview.files-selected', [selects.length])}</span>
    </>
  );

  return (
    <div className="DriveExplorerMenu">
      <Button onClick={onSquareClick}>
        <i className={squareIcon} />
      </Button>
      <DriveUploadButton />
      <Button variant="primary" onClick={onRefresh}>
        <i className="fas fa-sync-alt" />
      </Button>
      <Button variant="primary" onClick={driveNewFolder}>
        <i className="fas fa-folder-plus" />
      </Button>
      {selects.length > 0 && selectionMenus}
    </div>
  );
}
