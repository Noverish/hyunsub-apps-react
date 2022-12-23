import { useEffect } from 'react';
import driveListApi from 'src/api/drive/drive-list';
import { useDispatch, useSelector } from 'src/redux';
import { usePath } from 'src/pages/drive/DriveHooks';
import { DriveActions } from 'src/pages/drive/DriveRedux';
import { renderDriveFileList } from './DriveFileList';
import { CommonSuspenseFallback } from 'src/components/common/CommonSuspense';
import DriveSectionTemplate from './DriveSectionTemplate';
import DriveRenameControl from 'src/components/drive/DriveRenameControl';

import './DriveRenameFileList.scss';

interface Props {

}

export default function DriveRenameFileList(props: Props) {
  const dispatch = useDispatch();
  const [path] = usePath();
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
          {nextList.length} items
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
