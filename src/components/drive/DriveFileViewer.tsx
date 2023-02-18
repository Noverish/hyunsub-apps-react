import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { DriveFileInfo } from "src/model/drive";
import { driveNextAudioAction } from "src/pages/drive/explorer/DriveExplorerActions";
import { useDispatch } from "src/redux";
import AppConstant from "src/utils/constants";
import { join } from "src/utils/path";

interface Props {
  path: string;
  info: DriveFileInfo;
}

export default function DriveFileViewer({ path, info }: Props) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const filePath = join(path, info.name)
  const fileUrl = AppConstant.file.HOST + filePath;

  useEffect(() => {
    if (info && info.type === 'TEXT') {
      setText('');
      fetch(fileUrl, { credentials: 'include' })
        .then(res => res.text())
        .then(res => setText(res));
    }
  }, [dispatch, info, fileUrl]);

  const onAudioEnd = () => {
    dispatch(driveNextAudioAction());
  };

  if (info.type === 'IMAGE') {
    return <img src={fileUrl} alt={info.name} />;
  }

  if (info.type === 'VIDEO') {
    return <video src={fileUrl} controls autoPlay />;
  }

  if (info.type === 'AUDIO') {
    return <audio src={fileUrl} controls autoPlay onEnded={onAudioEnd}/>;
  }

  if (info.type === 'TEXT') {
    if (text) {
      return <pre><code>{text}</code></pre>
    } else {
      return <Spinner animation="border" />
    }
  }

  if (info.type === 'PDF') {
    return <object data={fileUrl}>{fileUrl}</object>;
  }

  return <div>{info.name === '../' ? '../' : filePath}</div>;
}
