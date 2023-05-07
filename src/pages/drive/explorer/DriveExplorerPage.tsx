import { useEffect } from "react";
import CommonContainer from "src/components/common/header/CommonContainer";
import DriveExplorer from "src/components/drive/explorer/DriveExplorer";
import { DriveExplorerProvider } from "src/components/drive/explorer/DriveExplorerContext";
import { useDriveExplorerKeyDown, useDriveExplorerPath } from 'src/components/drive/explorer/DriveExplorerHooks';
import { setDocumentTitle } from "src/utils/services";
import { DriveUploadProvider } from "src/components/drive/upload/DriveUploadContext";

import './DriveExplorerPage.scss';

function DriveExplorerPage() {
  const [path] = useDriveExplorerPath();

  useDriveExplorerKeyDown();

  useEffect(() => {
    setDocumentTitle(path);
  }, [path])

  return (
    <div id="DriveExplorerPage">
      <CommonContainer>
        <DriveExplorer />
      </CommonContainer>
    </div>
  )
}

export default function DriveExplorerIndex() {
  return (
    <DriveExplorerProvider>
      <DriveUploadProvider>
        <DriveExplorerPage />
      </DriveUploadProvider>
    </DriveExplorerProvider>
  )
}
