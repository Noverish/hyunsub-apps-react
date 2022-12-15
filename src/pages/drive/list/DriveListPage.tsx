import { Suspense, useEffect } from "react";
import { Button } from "react-bootstrap";
import DriveFileList from "src/components/drive/DriveFileList";
import DriveFileViewer from 'src/components/drive/DriveFileViewer';
import DriveUploadButton from 'src/components/drive/DriveUploadButton';
import LoadingPage from "src/pages/common/LoadingPage";
import { useDispatch, useSelector } from "src/redux";
import { usePath } from '../DriveHooks';
import { driveRemoveAction } from "./DriveListContext";

import './DriveListPage.scss';

export default function DriveListPage() {
  const [path] = usePath();
  const dispatch = useDispatch();
  const { file } = useSelector(s => s.drive);

  useEffect(() => {
    window.document.title = path;
  }, [path]);

  const onRemove = () => {
    dispatch(driveRemoveAction());
  }

  return (
    <div id="DriveListPage">
      <section className="list">
        <div className="top_bar">
          <span className="path">{path}</span>
          <DriveUploadButton />
        </div>
        <Suspense fallback={<LoadingPage />}>
          <DriveFileList />
        </Suspense>
      </section>
      <section className="viewer">
        <div className="top_bar">
          <div className="name">{file?.name || 'No file selected'}</div>
          {file && <Button variant="danger" onClick={onRemove}><i className="fas fa-trash"/></Button>}
        </div>
        <div className="content">
          <DriveFileViewer />
        </div>
      </section>
    </div>
  )
}
