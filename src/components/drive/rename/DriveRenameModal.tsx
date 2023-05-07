import { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import { DriveExplorerContext } from '../explorer/DriveExplorerContext';
import { DriveRenameContext, DriveRenameProvider } from './DriveRenameContext';
import DriveRenameControl from './DriveRenameControl';
import DriveRenameFileList from './DriveRenameFileList';

import './DriveRenameModal.scss';

function DriveRenameModal() {
  const [{ renameBulk, selects }, setExplorerState] = useContext(DriveExplorerContext);
  const setState = useContext(DriveRenameContext)[1];

  useEffect(() => {
    setState({ renames: selects });
  }, [selects, setState]);

  const onHide = () => setExplorerState({ renameBulk: false });

  return (
    <Modal className="DriveRenameModal" show={renameBulk} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>파일 이름 일괄 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DriveRenameControl />
        <DriveRenameFileList />
      </Modal.Body>
    </Modal>
  );
}

export default function DriveRenameModalIndex() {
  return (
    <DriveRenameProvider>
      <DriveRenameModal />
    </DriveRenameProvider>
  );
}
