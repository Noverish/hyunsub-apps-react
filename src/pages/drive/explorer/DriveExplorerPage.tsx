import { useEffect } from "react";
import MobileHeader from "src/components/common/header/MobileHeader";
import DriveContainer from "src/components/drive/DriveContainer";
import DriveFileList from "src/components/drive/DriveFileList";
import DrivePreviewSection from "src/components/drive/DrivePreviewSection";
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { useDispatch } from "src/redux";
import { useBreakpointMobile } from "src/utils/breakpoint";
import { setDocumentTitle } from "src/utils/services";
import { driveKeyboardAction } from "./DriveExplorerActions";

import './DriveExplorerPage.scss';

function DriveExplorerMobilePage() {
  return (
    <div id="DriveExplorerPage">
      <DriveContainer>
        <MobileHeader title="Drive" />
        <div>
          <DriveFileList index={0} />
        </div>
      </DriveContainer>
    </div>
  )
}

function DriveExplorerDesktopPage() {
  const dispatch = useDispatch();
  const { path } = useDriveStatus();

  useEffect(() => {
    setDocumentTitle(path);
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

export default function DriveExplorerPage() {
  const isMobile = useBreakpointMobile();

  return isMobile
    ? <DriveExplorerMobilePage />
    : <DriveExplorerDesktopPage />
}
