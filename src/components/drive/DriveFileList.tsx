import { Button } from 'react-bootstrap';
import driveListApi from 'src/api/drive/drive-list';
import FileUploadZone from 'src/components/common/FileUploadZone';
import DriveFileView from 'src/components/drive/DriveFileView';
import DriveUploadButton from 'src/components/drive/DriveUploadButton';
import { DriveFileInfo } from 'src/model/drive';
import { FileWithPath } from 'src/model/file';
import { driveUploadAction } from 'src/pages/drive/DriveContext';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { useDispatch } from 'src/redux';
import { CommonSuspenseFallback } from '../common/CommonSuspense';
import DriveSectionTemplate from './DriveSectionTemplate';

import './DriveFileList.scss';

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
  const { path, selects } = useDriveStatus(index);
  const { data: files } = driveListApi.useApiResult({ path });

  const onUpload = (files: FileWithPath[]) => {
    dispatch(driveUploadAction(path, files));
  }

  const onNewFolder = () => {
    dispatch(DriveActions.update({ showNewFolderModal: true }));
  }

  const content = files
    ? (
      <>
        <div className="files">
          <FileUploadZone onUpload={onUpload}>
            <div className="files_inner">
              {renderDriveFileList(files, index, path !== '/')}
            </div>
          </FileUploadZone>
        </div>
        <div className="status flex_center">
          {
            selects.length > 0
              ? `${selects.length} / ${files.length} selected`
              : `${files.length} items`
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
