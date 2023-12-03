import { t } from 'i18next';

import CommonLayout from 'src/components/common/layout/CommonLayout';
import DriveExplorer from 'src/components/drive/explorer/DriveExplorer';
import { DriveExplorerProvider } from 'src/components/drive/explorer/DriveExplorerContext';
import { useDriveExplorerKeyDown } from 'src/components/drive/explorer/DriveExplorerHooks';
import { DriveUploadProvider } from 'src/components/drive/upload/DriveUploadContext';

import './DriveExplorerPage.scss';

function DriveExplorerPage() {
  useDriveExplorerKeyDown();

  return (
    <CommonLayout className="DriveExplorerPage" title={t('DriveExplorerPage.title')}>
      <DriveExplorer />
    </CommonLayout>
  );
}

export default function DriveExplorerIndex() {
  return (
    <DriveExplorerProvider>
      <DriveUploadProvider>
        <DriveExplorerPage />
      </DriveUploadProvider>
    </DriveExplorerProvider>
  );
}
