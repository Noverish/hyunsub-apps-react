import { t } from 'i18next';
import { useContext } from 'react';
import { Modal } from 'react-bootstrap';

import { DriveExplorerContext } from '../explorer/DriveExplorerContext';
import { YoutubeDownloadContext, YoutubeDownloadProvider } from './YoutubeDownloadContext';
import YoutubeDownloadStatus from './YoutubeDownloadStatus';
import YoutubeMetadataForm from './YoutubeMetadataForm';
import youtubeMetadataApi from 'src/api/drive/youtube-metadata';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import YoutubeDownloadInput from 'src/components/drive/youtube/YoutubeDownloadInput';

import './YoutubeDownloadModal.scss';

function YoutubeDownloadModal() {
  // hooks
  const [{ showYoutubeModal }, setDriveExplorerState] = useContext(DriveExplorerContext);
  const [{ url, nonce, loading }, setState] = useContext(YoutubeDownloadContext);
  const { data, isFetching } = youtubeMetadataApi.useApiResult({ url }, { enabled: !!url });

  // functions
  const onHide = () => {
    setState({ url: '', nonce: undefined });
    setDriveExplorerState({ showYoutubeModal: false });
  };

  return (
    <Modal className="YoutubeDownloadModal" show={showYoutubeModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('drive.YoutubeDownloadModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <YoutubeDownloadInput />
        {data && <YoutubeMetadataForm metadata={data} />}
        <ListLoadingIndicator isFetching={isFetching || loading} />
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
