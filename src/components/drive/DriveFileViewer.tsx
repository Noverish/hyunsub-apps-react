import { join } from "src/utils/path";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import driveTextGetApi from "src/api/drive/drive-text-get";
import { DriveFileInfo } from "src/model/drive";
import { useDispatch } from "src/redux";
import AppConstant from "src/utils/constants";
import { driveNextAudioAction } from "src/pages/drive/explorer/DriveExplorerActions";

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
      driveTextGetApi.fetch({ path: filePath }).then(v => setText(v));
    }
  }, [dispatch, info, filePath]);

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
