import { t } from 'i18next';
import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { DriveExplorerContext } from '../explorer/DriveExplorerContext';
import youtubeFormatsApi from 'src/api/drive/youtube-formats';
import YoutubeDownloadInput from 'src/components/drive/youtube/YoutubeDownloadInput';
import YoutubeFormatTable from 'src/components/drive/youtube/YoutubeFormatTable';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';

import './YoutubeDownloadModal.scss';

export default function YoutubeDownloadModal() {
  // hooks
  const [{ showYoutubeModal }, setState] = useContext(DriveExplorerContext);
  const [url, setUrl] = useState('');
  const { data, isFetching } = youtubeFormatsApi.useApiResult({ url }, { enabled: !!url });

  // functions
  const onHide = () => setState({ showYoutubeModal: false });
  const onSubmit = (input: string) => setUrl(input);

  return (
    <Modal className="YoutubeDownloadModal" show={showYoutubeModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('drive.YoutubeDownloadModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <YoutubeDownloadInput onSubmit={onSubmit} />
        <ListLoadingIndicator isFetching={isFetching} />
        {data && <YoutubeFormatTable formats={data} />}
      </Modal.Body>
    </Modal>
  );
}
