import driveListApi from 'src/api/drive/drive-list';
import { useDispatch, useSelector } from 'src/redux';
import { useEffect } from 'react';
import { DriveActions } from '../../pages/drive/DriveRedux';
import DriveFileView from 'src/components/drive/DriveFileView';
import {keyboardAction} from '../../pages/drive/list/DriveListContext';

export default function DriveFileList() {
  const dispatch = useDispatch();
  const { path } = useSelector(s => s.drive);

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

  const elements = list.map(v => (
    <DriveFileView key={v.name} info={v} />
  ));

  return (
    <div className="DriveFileList my-2">
      {path !== '/' && <DriveFileView info={{ name: '../', type: 'FOLDER', size: '', date: '' }} />}
      {elements}
    </div>
  )
}
