import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import driveListApi from 'src/api/drive/drive-list';
import FileUploadZone from 'src/components/common/FileUploadZone';
import DriveFileView from 'src/components/drive/DriveFileView';
import DriveUploadButton from 'src/components/drive/DriveUploadButton';
import { DriveFileInfo } from 'src/model/drive';
import { FileWithPath } from 'src/model/file';
import { driveRemoveAction, driveUploadAction, keyboardAction } from 'src/pages/drive/DriveContext';
import { useDispatch } from 'src/redux';
import { CommonSuspenseFallback } from '../common/CommonSuspense';

import './DriveFileList.scss';
import DriveSectionTemplate from './DriveSectionTemplate';

export function renderDriveFileList(files: DriveFileInfo[], parent?: boolean) {
  const elements = files.map(v => (
    <DriveFileView key={JSON.stringify(v)} info={v} />
  ));

  return (
    <>
      {parent && <DriveFileView info={{ name: '../', type: 'FOLDER', size: '', date: '' }} />}
      {elements}
    </>
  )
}

interface Props {
  path: string;
}

export default function DriveFileList({ path }: Props) {
  const dispatch = useDispatch();
  const { data: files } = driveListApi.useApiResult({ path });
  const parent = path !== '/';

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      dispatch(keyboardAction(e));
    }

    return () => {
      window.onkeydown = null;
    }
  }, [dispatch]);

  const onUpload = (files: FileWithPath[]) => {
    dispatch(driveUploadAction(files));
  }

  const onRemove = () => {
    dispatch(driveRemoveAction());
  }

  const onNewFolder = () => {

  }

  const content = files
    ? (
      <>
        <div className="files">
          <FileUploadZone onUpload={onUpload}>
            <div className="files_inner">
              {renderDriveFileList(files, parent)}
            </div>
          </FileUploadZone>
        </div>
        <div className="status flex_center">
          {files.length} items
        </div>
      </>
    ) : (
      <CommonSuspenseFallback />
    )

  const btnBarChildren = (
    <>
      <Button variant="danger" onClick={onRemove}><i className="fas fa-trash" /></Button>
      <Button variant="primary" onClick={onNewFolder}><i className="fas fa-folder-plus" /></Button>
      <DriveUploadButton />
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
