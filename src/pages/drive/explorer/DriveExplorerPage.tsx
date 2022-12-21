import { useEffect } from "react";
import DriveContainer from "src/components/drive/DriveContainer";
import DriveFileListSection from 'src/components/drive/DriveFileListSection';
import DriveHeader from 'src/components/drive/DriveHeader';
import DrivePreviewSection from "src/components/drive/DrivePreviewSection";
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { useDispatch } from "src/redux";
import { usePath } from '../DriveHooks';

export default function DriveExplorerPage() {
  const dispatch = useDispatch();
  const [path] = usePath();

  useEffect(() => {
    window.document.title = path;
  }, [path]);

  useEffect(() => {
    dispatch(DriveActions.update({ file: undefined }));
  }, [dispatch, path]);

  return (
    <div id="DriveExplorerPage">
      <DriveHeader title="Drive" />
      <DriveContainer>
        <div className="drive_two_column">
          <DriveFileListSection />
          <DrivePreviewSection />
        </div>
      </DriveContainer>
    </div>
  )
}
