import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
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
      <Link to={VideoRoutes.detail({ entryId })}>
        <Button>Go to Entry</Button>
      </Link>
      <EntryScanCard />
      <EntryRenameForm />
      <EntryVideoRegisterCard />
    </CommonLayout>
  );
}
