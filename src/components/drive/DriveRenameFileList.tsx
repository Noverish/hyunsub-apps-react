import { useEffect } from 'react';
import driveListApi from 'src/api/drive/drive-list';
import { CommonSuspenseFallback } from 'src/components/common/CommonSuspense';
import DriveRenameControl from 'src/components/drive/DriveRenameControl';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { useDispatch, useSelector } from 'src/redux';
import { renderDriveFileList } from './DriveFileList';
import DriveSectionTemplate from './DriveSectionTemplate';
import { useTranslation } from 'react-i18next';

import './DriveRenameFileList.scss';

export default function DriveRenameFileList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { path, selects } = useDriveStatus();
  const { data: prevList } = driveListApi.useApiResult({ path });
  const { renames: nextList } = useSelector(s => s.drive);
  const parent = path !== '/';

  useEffect(() => {
    if (prevList) {
      dispatch(DriveActions.update({ renames: prevList }));
    }
  }, [dispatch, prevList]);

  const content = prevList
    ? (
      <>
        <div className="files">
          <div className="files_inner">
            <div className="files_inner_2">
              <div className="files_inner_3">
                {renderDriveFileList(prevList, 0, parent)}
              </div>
              <div className="files_inner_3">
                {renderDriveFileList(nextList, 0, parent)}
              </div>
            </div>
          </div>
        </div>
        <div className="status flex_center">
          {selects.length > 0
            ? t('drive.file-list.selected', [selects.length, nextList.length])
            : t('drive.file-list.no-selection', [nextList.length])}
        </div>
      </>
    ) : (
      <CommonSuspenseFallback />
    )

  return (
    <DriveSectionTemplate
      className="DriveRenameFileList"
      title={path}
      btnBarChildren={<DriveRenameControl />}
    >
      {content}
    </DriveSectionTemplate>
  )
}
