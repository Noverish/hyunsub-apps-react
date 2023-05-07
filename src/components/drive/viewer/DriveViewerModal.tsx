import { Modal } from 'react-bootstrap';

import { useDriveExplorerContext } from '../explorer/DriveExplorerHooks';
import DriveFileViewer from './DriveFileViewer';

import './DriveViewerModal.scss';

export default function DriveViewerModal() {
  const {
    state: { viewer },
    setState,
    selects,
    files,
  } = useDriveExplorerContext();

  const onHide = () => setState({ viewer: false });

  const file = files[files.findIndex((v) => v.name === selects[0])];

  return (
    <Modal show={viewer && !!file} onHide={onHide} className="DriveViewerModal" centered contentClassName="container-md">
      {file && <DriveFileViewer file={file} />}
    </Modal>
  );
}
