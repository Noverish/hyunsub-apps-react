import { useContext } from 'react';
import fileUploadApi from 'src/api/file/file-upload';
import usePhotoUploadApi from 'src/api/photo/photo-upload';
import { PhotoUploadContext } from 'src/pages/photo/upload/PhotoUploadContext';

export function usePhotoUpload() {
  const [state, setState] = useContext(PhotoUploadContext);
  const { items } = state;

  const nonces: string[] = Array(items.length);

  const photoUploadApi = usePhotoUploadApi((result) => {
    const index = nonces.indexOf(result.nonce);
    const item = items[index];
    if (result.success) {
      item.status = 'success';
      item.preview = result.preview;
    } else {
      item.status = 'error';
      item.errMsg = result.errMsg;
    }
    setState({ items });
  });

  return async () => {
    items.forEach(v => v.status = 'uploading');
    setState({ items, uploading: true });

    const files = items.map(v => v.file);

    fileUploadApi({
      files,
      progress: (status) => {
        const { index, ratio } = status.current;
        items[index].progress = ratio;
        setState({ items, progress: status.total.ratio });
      },
      callback: ({ i, nonce, fileName: name }) => {
        nonces[i] = nonce;
        items[i].progress = 100;
        items[i].status = 'registering';
        setState({ items });
        photoUploadApi({ nonce, name });
      }
    });
  }
}