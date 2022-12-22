import { Button } from 'react-bootstrap';
import DriveFileViewer from 'src/components/drive/DriveFileViewer';
import { usePath } from 'src/pages/drive/DriveHooks';
import { driveRemoveAction } from 'src/pages/drive/DriveContext';
import { useDispatch, useSelector } from 'src/redux';
import AppConstant from 'src/utils/constants';
import DriveSectionTemplate from './DriveSectionTemplate';

import './DrivePreviewSection.scss';

export default function DrivePreviewSection() {
  const [path] = usePath();
  const dispatch = useDispatch();
  const { file } = useSelector(s => s.drive);

  const onRemove = () => {
    dispatch(driveRemoveAction());
  }

  const onDownload = () => {
    if (!file) {
      return;
    }

    const fileUrl = AppConstant.file.HOST + path + '/' + file.name;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = file.name;
    link.click();
  }

  const btnBarChilren = (
    <>
      {file && <Button variant="primary" onClick={onDownload}><i className="fas fa-download" /></Button>}
      {file && <Button variant="danger" onClick={onRemove}><i className="fas fa-trash" /></Button>}
    </>
  )

  return (
    <DriveSectionTemplate
      className="DrivePreviewSection"
      title={file?.name || 'No file selected'}
      btnBarChildren={btnBarChilren}
    >
      <DriveFileViewer />
    </DriveSectionTemplate>
  )
}
