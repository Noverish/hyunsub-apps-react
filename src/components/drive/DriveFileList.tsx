import driveListApi from 'src/api/drive/drive-list';
import DriveFileView from 'src/components/drive/DriveFileView';
import CommonSuspense from "../common/CommonSuspense";
import { usePath } from 'src/pages/drive/DriveHooks';
import { DriveFileInfo } from 'src/model/drive';
import { useEffect } from 'react';

interface InnerProps {
  parent?: boolean;
  files: DriveFileInfo[];
}

function DriveFileListInner({ parent, files }: InnerProps) {
  const elements = files.map(v => (
    <DriveFileView key={v.name} info={v} />
  ));

  return (
    <>
      {parent && <DriveFileView info={{ name: '../', type: 'FOLDER', size: '', date: '' }} />}
      {elements}
    </>
  )
}

function DriveFileListWithPath({ path }: { path: string }) {
  const files = driveListApi.useApi({ path });
  return (
    <DriveFileListInner parent={path !== '/'} files={files} />
  )
}

function DriveFileListOnCurrentPath({ onPathChange }: Pick<Props, 'onPathChange'>) {
  const [path] = usePath();
  const files = driveListApi.useApi({ path });

  useEffect(() => {
    console.log({ path, files });
    onPathChange?.(path, files);
  }, [path, files])

  return (
    <DriveFileListInner parent={path !== '/'} files={files} />
  )
}

interface Props {
  path?: string;
  files?: DriveFileInfo[];
  parent?: boolean;
  onPathChange?: (path: string, files: DriveFileInfo[]) => void;
}

export default function DriveFileList({ path, files, parent, onPathChange }: Props) {
  let content;
  if (files) {
    content = <DriveFileListInner files={files} parent={parent} />;
  } else if (path) {
    content = <DriveFileListWithPath path={path} />;
  } else {
    content = <DriveFileListOnCurrentPath onPathChange={onPathChange} />;
  }

  return (
    <div className="DriveFileList">{content}</div>
  )
}
