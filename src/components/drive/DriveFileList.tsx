import { Button } from 'react-bootstrap';
import driveListApi from 'src/api/drive/drive-list';
import FileUploadZone from 'src/components/common/FileUploadZone';
import DriveFileView from 'src/components/drive/DriveFileView';
import DriveUploadButton from 'src/components/drive/DriveUploadButton';
import { DriveFileInfo } from 'src/model/drive';
import { FileWithPath } from 'src/model/file';
import { driveUploadAction } from 'src/pages/drive/DriveActions';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { useDispatch } from 'src/redux';
import { CommonSuspenseFallback } from '../common/CommonSuspense';
import DriveSectionTemplate from './DriveSectionTemplate';
import { driveMoveBulkAction } from 'src/pages/drive/move/DriveMoveActions';

import './DriveFileList.scss';
import { useTranslation } from 'react-i18next';

export function renderDriveFileList(files: DriveFileInfo[], index: number, parent?: boolean) {
  const elements = files.map(v => (
    <DriveFileView key={JSON.stringify(v)} info={v} index={index} />
  ));

  return (
    <>
      {parent && <DriveFileView info={{ name: '../', type: 'FOLDER', size: '', date: '' }} index={index} />}
      {elements}
    </>
  )
}

interface Props {
  index: number;
}

export default function DriveFileList({ index }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { path, selects } = useDriveStatus(index);
  const { data: files } = driveListApi.useApiResult({ path });

  const onUpload = (files: FileWithPath[]) => {
    dispatch(driveUploadAction(path, files));
  }

  const onElementDrop = (dataTransfer: DataTransfer) => {
    const moves: string[] = JSON.parse(dataTransfer.getData('moves'));
    const fromPath = dataTransfer.getData('path');
    dispatch(driveMoveBulkAction({ from: fromPath, to: path, files: moves }));
  }

  const onNewFolder = () => {
    dispatch(DriveActions.update({ newFolderModalIndex: index }));
  }

  const content = files
    ? (
      <>
        <div className="files">
          <FileUploadZone onUpload={onUpload} onElementDrop={onElementDrop}>
            <div className="files_inner">
              {renderDriveFileList(files, index, path !== '/')}
            </div>
          </FileUploadZone>
        </div>
        <div className="status flex_center">
          {
            selects.length > 0
              ? t('drive.file-list.selected', [selects.length, files.length])
              : t('drive.file-list.no-selection', [files.length])
          }
        </div>
      </>
    ) : (
      <CommonSuspenseFallback />
    )

  const btnBarChildren = (
    <>
      <Button variant="primary" onClick={onNewFolder}><i className="fas fa-folder-plus" /></Button>
      <DriveUploadButton path={path} />
    </>
  );

  return (
    <DriveSectionTemplate
      className="DriveFileList"
      title={path}
      btnBarChildren={btnBarChildren}
    >
      {content}
    </DriveSectionTemplate>
  )
}
