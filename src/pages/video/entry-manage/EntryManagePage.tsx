import { Link } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
import EntryVideoRegisterCard from './components/EntryVideoRegisterCard';
import videoEntryDetailApi from 'src/api/video/video-entry-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { useUrlParams } from 'src/hooks/url-params';
import EntryRenameForm from 'src/pages/video/entry-manage/components/EntryRenameCard';
import EntryScanCard from 'src/pages/video/entry-manage/components/EntryScanCard';
import { setDocumentTitle } from 'src/utils/services';

import './EntryManagePage.scss';

export default function EntryManagePage() {
  setDocumentTitle(`Entry Manage`);

  const [entryId] = useUrlParams('entryId');

  const { entry } = videoEntryDetailApi.useApi({ entryId });

  return (
    <div id="EntryManagePage">
      <MobileHeader title="Entry Manage" back />
      <CommonContainer>
        <Link to={VideoRoutes.detail({ entryId })}>
          <h1>{entry.name}</h1>
        </Link>
        <EntryScanCard />
        <EntryRenameForm />
        <EntryVideoRegisterCard />
      </CommonContainer>
    </div>
  );
}
