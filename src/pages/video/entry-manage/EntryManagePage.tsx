import EntryVideoRegisterCard from './components/EntryVideoRegisterCard';
import videoEntryGetApi from 'src/api/video/video-entry-get';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { useUrlParams } from 'src/hooks/url-params';
import EntryRenameForm from 'src/pages/video/entry-manage/components/EntryRenameCard';
import EntryScanCard from 'src/pages/video/entry-manage/components/EntryScanCard';

import './EntryManagePage.scss';

export default function EntryManagePage() {
  const [entryId] = useUrlParams('entryId');

  const entry = videoEntryGetApi.useApi({ entryId });

  return (
    <CommonLayout className="EntryManagePage" title={`Entry Manage - ${entry.name}`} back>
      <EntryScanCard />
      <EntryRenameForm />
      <EntryVideoRegisterCard />
    </CommonLayout>
  );
}
