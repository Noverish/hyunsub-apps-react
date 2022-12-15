import { Suspense } from "react";
import DriveFileList from "src/components/drive/DriveFileList";
import DriveFileViewer from 'src/components/drive/DriveFileViewer';
import LoadingPage from "src/pages/common/LoadingPage";
import { useSelector } from "src/redux";
import { usePath } from '../DriveHooks';

import './DriveListPage.scss';

export default function DriveListPage() {
  const [path] = usePath();
  const { file } = useSelector(s => s.drive);

  return (
    <div id="DriveListPage">
      <section className="list">
        <div className="DriveFileList">
          <div className="path">{path}</div>
          <hr />
          <Suspense fallback={<LoadingPage />}>
            <DriveFileList />
          </Suspense>
        </div>
      </section>
      <div className="vr" />
      <section className="viewer">
        <div className="name">{file?.name || 'No file selected'}</div>
        <hr />
        <div className="content">
          <DriveFileViewer />
        </div>
      </section>
    </div>
  )
}
