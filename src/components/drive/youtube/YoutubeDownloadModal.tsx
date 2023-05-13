import { t } from 'i18next';
import { useContext } from 'react';
import { Modal } from 'react-bootstrap';

import { DriveExplorerContext } from '../explorer/DriveExplorerContext';
import { YoutubeDownloadContext, YoutubeDownloadProvider } from './YoutubeDownloadContext';
import YoutubeDownloadStatus from './YoutubeDownloadStatus';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import YoutubeDownloadInput from 'src/components/drive/youtube/YoutubeDownloadInput';

import './YoutubeDownloadModal.scss';

function YoutubeDownloadModal() {
  // hooks
  const [{ showYoutubeModal }, setState] = useContext(DriveExplorerContext);
  const [{ nonce, loading }] = useContext(YoutubeDownloadContext);

  // functions
  const onHide = () => setState({ showYoutubeModal: false });

  return (
    <Modal className="YoutubeDownloadModal" show={showYoutubeModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('drive.YoutubeDownloadModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <YoutubeDownloadInput />
        <ListLoadingIndicator isFetching={loading} />
        {nonce && <YoutubeDownloadStatus nonce={nonce} />}
      </Modal.Body>
    </Modal>
  );
}

export default function YoutubeDownloadModalIndex() {
  return (
    <YoutubeDownloadProvider>
      <YoutubeDownloadModal />
    </YoutubeDownloadProvider>
  );
}
