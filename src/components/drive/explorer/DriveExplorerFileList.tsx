import { t } from 'i18next';
import { useMemo } from 'react';
import { Spinner } from 'react-bootstrap';

import DriveUploadHooks from '../upload/DriveUploadHooks';
import FileUploadZone from 'src/components/common/FileUploadZone';
import DriveFileListItem from 'src/components/drive/explorer/DriveExplorerFileItem';
import { useDriveExplorerFilesWithSort } from 'src/components/drive/explorer/DriveExplorerHooks';

import './DriveExplorerFileList.scss';

export default function DriveExplorerFileList() {
  const { files, nameArrow, dateArrow, sizeArrow, onNameClick, onDateClick, onSizeClick } =
    useDriveExplorerFilesWithSort();
  const ready = DriveUploadHooks.useReady();

  const onElementDrop = (dataTransfer: DataTransfer) => {
    // const moves: string[] = JSON.parse(dataTransfer.getData('moves'));
    // const fromPath = dataTransfer.getData('path');
    // dispatch(driveMoveBulkAction({ from: fromPath, to: path, files: moves }));
  };

  const rows = files && files.map((v) => <DriveFileListItem key={v.name} file={v} />);

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
      );
    }

    return undefined;
  }, [files]);

  return (
    <FileUploadZone onUpload={ready} onElementDrop={onElementDrop}>
      <div className="DriveExplorerFileList">
        <div className="my_table">
          <div className="table_row table_header">
            <div className="cell check"></div>
            <div className="cell icon">{t('drive.DriveExplorerFileList.type')}</div>
            <div className="cell name">
              <span className="sort_btn" onClick={onNameClick}>
                {t('drive.DriveExplorerFileList.name')}
                {nameArrow}
              </span>
            </div>
            <div className="cell size">
              <span className="sort_btn" onClick={onSizeClick}>
                {t('drive.DriveExplorerFileList.size')}
                {sizeArrow}
              </span>
            </div>
            <div className="cell date">
              <span className="sort_btn" onClick={onDateClick}>
                {t('drive.DriveExplorerFileList.date')}
                {dateArrow}
              </span>
            </div>
          </div>
          {rows}
        </div>
        {additional}
        {files && (
          <div className="table_footer flex_center">{t('drive.DriveExplorerFileList.n-files', [files.length])}</div>
        )}
      </div>
    </FileUploadZone>
  );
}
