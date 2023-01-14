import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DriveActions } from "src/pages/drive/DriveRedux";
import { useDispatch, useSelector } from "src/redux";

import './DriveStatusModal.scss';

export default function DriveStatusModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { uploadStatus } = useSelector(s => s.drive);

  if (!uploadStatus) {
    return (
      <div />
    )
  }

  const onClear = () => {
    dispatch(DriveActions.update({ uploadStatus: undefined }));
  }

  const { total, curr } = uploadStatus;
  const percent = Math.round(curr / total * 10000) / 100;

  return (
    <div className="DriveStatusModal">
      <div className="header">
        <span className="title">{t('drive.status-modal.title')}</span>
        <i className="fas fa-times gray_on_hover" onClick={onClear}></i>
      </div>
      <ProgressBar className="total_progress" animated now={percent} label={`${percent}%`} />
    </div>
  )
}
