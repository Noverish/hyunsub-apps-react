import { Button } from 'react-bootstrap';
import DriveFileViewer from 'src/components/drive/DriveFileViewer';
import { driveRemoveAction } from 'src/pages/drive/DriveContext';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { useDispatch, useSelector } from 'src/redux';
import AppConstant from 'src/utils/constants';
import { join } from 'src/utils/path';
import DriveSectionTemplate from './DriveSectionTemplate';

import './DrivePreviewSection.scss';

export default function DrivePreviewSection() {
  const { path } = useDriveStatus();
  const dispatch = useDispatch();
  const select = useSelector(s => s.drive.status)[0]?.lastSelect;

  const onRemove = () => {
    dispatch(driveRemoveAction());
  }

  const onDownload = () => {
    if (!select) {
      return;
    }

    const fileUrl = AppConstant.file.HOST + join(path, select.name);

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = select.name;
    link.click();
  }

  const btnBarChilren = (
    <>
      {select && select.type !== 'FOLDER' && <Button variant="primary" onClick={onDownload}><i className="fas fa-download" /></Button>}
      {select && <Button variant="danger" onClick={onRemove}><i className="fas fa-trash" /></Button>}
    </>
  )

  return (
    <DriveSectionTemplate
      className="DrivePreviewSection"
      title={select?.name || 'No file selected'}
      btnBarChildren={btnBarChilren}
    >
      {select && <DriveFileViewer path={path} info={select}/>}
    </DriveSectionTemplate>
  )
}
