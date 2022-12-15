import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DriveActions } from "src/pages/drive/DriveRedux";
import { useDispatch, useSelector } from "src/redux";

import './DriveStatusModal.scss';

export default function DriveStatusModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { uploads } = useSelector(s => s.drive);

  const current = uploads.filter(v => v.progress !== 100)[0] || uploads[uploads.length - 1];
  if (!current) {
    return (
      <div />
    )
  }

  const onClear = () => {
    dispatch(DriveActions.update({ uploads: [] }));
  }

  const totalNum = uploads.filter(v => v.progress !== 0).length;
  const totalProgress = Math.floor(10000 * totalNum / uploads.length) / 100;
  const progressLabel = `${totalNum}/${uploads.length} (${totalProgress}%)`;

  return (
    <div className="DriveStatusModal">
      <div className="header">
        <span className="title">{t('drive.status-modal.title')}</span>
        <i className="fas fa-times gray_on_hover" onClick={onClear}></i>
      </div>
      <div className="current_status">
        <span className="current_path">{current.path}</span>
        <ProgressBar className="current_progress" animated now={current.progress} />
      </div>
      <ProgressBar className="total_progress" animated now={totalProgress} label={progressLabel} />
    </div>
  )
}
