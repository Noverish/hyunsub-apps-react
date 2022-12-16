import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { usePath } from 'src/pages/drive/DriveHooks';
import { useDispatch, useSelector } from "src/redux";
import AppConstant from "src/utils/constants";
import { nextAudioAction, textFileSelectAction } from '../../pages/drive/list/DriveListContext';

export default function DriveFileViewer() {
  const dispatch = useDispatch();
  const [path] = usePath();
  const { file, text } = useSelector(s => s.drive);

  useEffect(() => {
    if (file && file.type === 'TEXT') {
      dispatch(textFileSelectAction());
    }
  }, [file, dispatch]);

  const onAudioEnd = () => {
    dispatch(nextAudioAction());
  };

  if (!file) {
    return <></>
  }

  const fileUrl = AppConstant.file.HOST + path + '/' + file.name;

  if (file.type === 'IMAGE') {
    return <img src={fileUrl} alt={file.name} />;
  }

  if (file.type === 'VIDEO') {
    return <video src={fileUrl} controls autoPlay />;
  }

  if (file.type === 'AUDIO') {
    return <audio src={fileUrl} controls autoPlay onEnded={onAudioEnd}/>;
  }

  if (file.type === 'TEXT') {
    if (text) {
      return <pre><code>{text}</code></pre>
    } else {
      return <Spinner animation="border" />
    }
  }

  if (file.type === 'PDF') {
    return <object data={fileUrl}>{fileUrl}</object>;
  }

  return <div>{fileUrl}</div>;
}
