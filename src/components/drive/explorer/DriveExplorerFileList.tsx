import { t } from 'i18next';
import { Spinner } from 'react-bootstrap';
import FileUploadZone from 'src/components/common/FileUploadZone';
import DriveFileListItem from 'src/components/drive/explorer/DriveExplorerFileItem';
import { DriveFileInfo } from 'src/model/drive';
import { FileWithPath } from 'src/model/file';

import './DriveExplorerFileList.scss';
import { useMemo } from 'react';

interface Props {
  files?: DriveFileInfo[];
}

export default function DriveExplorerFileList({ files }: Props) {
  const onUpload = (files: FileWithPath[]) => {
    // dispatch(driveUploadAction(path, files));
  }

  const onElementDrop = (dataTransfer: DataTransfer) => {
    // const moves: string[] = JSON.parse(dataTransfer.getData('moves'));
    // const fromPath = dataTransfer.getData('path');
    // dispatch(driveMoveBulkAction({ from: fromPath, to: path, files: moves }));
  }

  const rows = files && files.map(v => (
    <DriveFileListItem key={v.name} file={v} />
  ));

  const additional = useMemo(() => {
    if (!files) {
      return (
        <div className="loading flex_center">
          <Spinner animation="border"></Spinner>
        </div>
      );
    }

    if (files.length === 0) {
      return (
        <div className="loading flex_center">
          <span>{t('drive.DriveExplorerFileList.empty-folder')}</span>
        </div>
      )
    }

    return undefined;
  }, [files]);

  return (
    <FileUploadZone onUpload={onUpload} onElementDrop={onElementDrop}>
      <div className="DriveExplorerFileList">
        <div className="my_table">
          <div className="table_row table_header">
            <div className="cell check"></div>
            <div className="cell icon">{t('drive.DriveExplorerFileList.type')}</div>
            <div className="cell name">{t('drive.DriveExplorerFileList.name')}</div>
            <div className="cell size">{t('drive.DriveExplorerFileList.size')}</div>
            <div className="cell date">{t('drive.DriveExplorerFileList.date')}</div>
          </div>
          {rows}
        </div>
        {additional}
      </div>
    </FileUploadZone>
  )
}
