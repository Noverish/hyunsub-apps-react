import { useEffect } from "react";
import DriveContainer from "src/components/drive/DriveContainer";
import DriveFileList from "src/components/drive/DriveFileList";
import DriveHeader from 'src/components/drive/DriveHeader';
import DrivePreviewSection from "src/components/drive/DrivePreviewSection";
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { useDispatch } from "src/redux";
import { usePath } from '../DriveHooks';
import { keyboardAction } from 'src/pages/drive/DriveContext';

import './DriveExplorerPage.scss';

export default function DriveExplorerPage() {
  const dispatch = useDispatch();
  const [path] = usePath();

  useEffect(() => {
    window.document.title = path;
  }, [path]);

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

  return (
    <div id="DriveExplorerPage">
      <DriveHeader title="Drive" />
      <DriveContainer>
        <DriveFileList />
        <DrivePreviewSection />
      </DriveContainer>
    </div>
  )
}
