import { useEffect } from 'react';
import driveListApi from 'src/api/drive/drive-list';
import DriveFileView from 'src/components/drive/DriveFileView';
import { useDispatch } from 'src/redux';
import { usePath } from 'src/pages/drive/DriveHooks';
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { keyboardAction } from 'src/pages/drive/list/DriveListContext';

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
