import { useEffect } from 'react';
import DriveUploadButton from 'src/components/drive/DriveUploadButton';
import { FileWithPath } from 'src/model/file';
import { driveUploadAction, keyboardAction } from 'src/pages/drive/DriveContext';
import { usePath } from 'src/pages/drive/DriveHooks';
import { useDispatch } from 'src/redux';
import CommonSuspense from '../common/CommonSuspense';
import FileUploadZone from '../common/FileUploadZone';
import DriveFileList from './DriveFileList';

import './DriveFileListSection.scss';

export default function DriveFileListSection() {
  const [path] = usePath();

  const dispatch = useDispatch();

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

  return (
    <section className="DriveFileListSection">
      <div className="top_bar">
        <span className="path">{path}</span>
        <DriveUploadButton />
      </div>
      <div className="content">
        <CommonSuspense>
          <FileUploadZone onUpload={onUpload}>
            <div className="file_list_container">
              <DriveFileList />
            </div>
          </FileUploadZone>
        </CommonSuspense>
      </div>
    </section>
  )
}
