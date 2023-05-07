import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { DriveFileInfo } from "src/model/drive";
import { useDispatch } from "src/redux";
import AppConstant from "src/utils/constants";
import { join } from "src/utils/path";
import { useDriveExplorerContext } from "../explorer/DriveExplorerHooks";
import { parseFileType } from "../DriveFileIcon";

interface Props {
  file: DriveFileInfo;
}

export default function DriveFileViewer({ file }: Props) {
  // hooks
  const { path } = useDriveExplorerContext();
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const filePath = join(path, file.name)
  const fileUrl = AppConstant.file.HOST + filePath;
  const type = parseFileType(file.name, file.isDir);

  useEffect(() => {
    if (type === 'TEXT') {
      setText('');
      fetch(fileUrl, { credentials: 'include' })
        .then(res => res.text())
        .then(res => setText(res));
    }
  }, [dispatch, file, fileUrl, type]);

  if (type === 'IMAGE') {
    return <img src={fileUrl} alt={file.name} />;
  }

  if (type === 'VIDEO') {
    return <video src={fileUrl} controls autoPlay />;
  }

  if (type === 'AUDIO') {
    return <audio src={fileUrl} controls autoPlay />;
  }

  if (type === 'TEXT') {
    if (text) {
      return <pre className="container-md"><code>{text}</code></pre>;
    } else {
      return (
        <div className="spinner_wrapper container-md flex_center">
          <Spinner animation="border" />
        </div>
      )
    }
  }

  if (type === 'PDF') {
    return (
      <div className="container-md">
        <object data={fileUrl}>{fileUrl}</object>
      </div>
    );
  }

  return <div>{file.name === '../' ? '../' : filePath}</div>;
}
