import { join } from 'path-browserify';
import { Button } from 'react-bootstrap';
import DriveFileViewer from 'src/components/drive/DriveFileViewer';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { driveRemoveAction } from 'src/pages/drive/explorer/DriveExplorerActions';
import { useDispatch } from 'src/redux';
import AppConstant from 'src/utils/constants';
import DriveSectionTemplate from './DriveSectionTemplate';
import { useTranslation } from 'react-i18next';

import './DrivePreviewSection.scss';

export default function DrivePreviewSection() {
  const { t } = useTranslation();
  const { path, selects, lastSelect } = useDriveStatus();
  const dispatch = useDispatch();
  const select = selects.length === 1 ? lastSelect : undefined;

  const onRemove = () => {
    dispatch(driveRemoveAction());
  }

  const onRename = () => {
    if (select) {
      const filePath = join(path, select.name)
      dispatch(DriveActions.update({ renameModalPath: filePath }));
    }
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
      {select && <Button variant="primary" onClick={onRename}><i className="fas fa-pen" /></Button>}
      {selects.length > 0 && <Button variant="danger" onClick={onRemove}><i className="fas fa-trash" /></Button>}
    </>
  )

  let title = '';
  if (selects.length === 0) {
    title = t('drive.preview.no-file-selected');
  } else if (selects.length > 1) {
    title = t('drive.preview.files-selected', [selects.length]);
  } else {
    title = selects[0];
  }

  return (
    <DriveSectionTemplate
      className="DrivePreviewSection"
      title={title}
      btnBarChildren={btnBarChilren}
    >
      {select && <DriveFileViewer path={path} info={select}/>}
    </DriveSectionTemplate>
  )
}
