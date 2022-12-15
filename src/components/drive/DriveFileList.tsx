import { useEffect } from 'react';
import driveListApi from 'src/api/drive/drive-list';
import DriveFileView from 'src/components/drive/DriveFileView';
import { usePath } from 'src/pages/drive/DriveHooks';
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { driveUploadAction, keyboardAction } from 'src/pages/drive/list/DriveListContext';
import { useDispatch } from 'src/redux';
import FileUploadZone from 'src/components/common/FileUploadZone';
import { FileWithPath } from 'src/model/file';

import './DriveFileList.scss';

export default function DriveFileList() {
  const dispatch = useDispatch();
  const [path] = usePath();

  const list = driveListApi.useApi({ path });

  useEffect(() => {
    dispatch(DriveActions.update({ file: undefined }));
  }, [dispatch, path]);

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

  const elements = list.map(v => (
    <DriveFileView key={v.name} info={v} />
  ));

  return (
    <FileUploadZone onUpload={onUpload} className="DriveFileList">
      <div className="wrapper fit_parent">
        <div className="py-2">
          {path !== '/' && <DriveFileView info={{ name: '../', type: 'FOLDER', size: '', date: '' }} />}
          {elements}
        </div>
      </div>
    </FileUploadZone>

  )
}
