import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "src/redux";
import AppConstant from "src/utils/constants";
import { textFileSelectAction } from '../../pages/drive/list/DriveListContext';

export default function DriveFileViewer() {
  const dispatch = useDispatch();
  const { path, file, text } = useSelector(s => s.drive);

  useEffect(() => {
    if (file && file.type === 'TEXT') {
      dispatch(textFileSelectAction());
    }
  }, [file, dispatch]);

  if (!file) {
    return <></>
  }

  const fileUrl = AppConstant.file.HOST + path + '/' + file.name;

  if (file.type === 'IMAGE') {
    return <img src={fileUrl} alt={file.name} />;
  }

  if (file.type === 'VIDEO') {
    return <video src={fileUrl} controls />;
  }

  if (file.type === 'AUDIO') {
    return <audio src={fileUrl} controls autoPlay={true} />;
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
