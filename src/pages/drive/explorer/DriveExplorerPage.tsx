import { useEffect } from "react";
import DriveContainer from "src/components/drive/DriveContainer";
import DriveFileList from "src/components/drive/DriveFileList";
import DriveHeader from 'src/components/drive/DriveHeader';
import DrivePreviewSection from "src/components/drive/DrivePreviewSection";
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { useDispatch } from "src/redux";
import { driveKeyboardAction } from "./DriveExplorerActions";

import './DriveExplorerPage.scss';

export default function DriveExplorerPage() {
  const dispatch = useDispatch();
  const { path } = useDriveStatus();

  useEffect(() => {
    window.document.title = path;
  }, [path]);

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      dispatch(driveKeyboardAction(e));
    }

    return () => {
      window.onkeydown = null;
    }
  }, [dispatch]);

  return (
    <div id="DriveExplorerPage">
      <DriveHeader title="Drive" />
      <DriveContainer>
        <div>
          <DriveFileList index={0} />
        </div>
        <div>
          <DrivePreviewSection />
        </div>
      </DriveContainer>
    </div>
  )
}
