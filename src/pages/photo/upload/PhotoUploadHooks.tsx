import { useContext } from 'react';
import fileUploadMultipartApi from 'src/api/file/file-upload-multipart';
import usePhotoUploadApi from 'src/api/photo/photo-upload';
import { PhotoUploadContext, PhotoUploadFileItem } from 'src/pages/photo/upload/PhotoUploadContext';

export function usePhotoUpload() {
  const [state, setState] = useContext(PhotoUploadContext);
  const { items } = state;

  const photoUploadApi = usePhotoUploadApi((result) => {
    const item = items.filter(v => v.path === result.path)[0];
    if (result.success) {
      item.status = 'success';
    } else {
      item.status = 'error';
      item.errMsg = result.errMsg;
    }
    setState({ items });
  })

  const files = items.map(v => v.file);
  const sizes = Array.from({ length: files.length }, () => 0);

  for (let i = 0; i < files.length; i++) {
    if (i === 0) {
      sizes[i] = files[i].size;
    } else {
      sizes[i] = files[i].size + sizes[i - 1];
    }
  }

  const onUploaded = (item: PhotoUploadFileItem) => {
    if (item.status === 'uploading') {
      item.status = 'registering';
      setState({ items });
    }
  }

  return async () => {
    items.forEach(v => v.status = 'uploading');
    setState({ items, uploading: true });

    await fileUploadMultipartApi({
      path: '/hyunsub/photo/tmp',
      files,
      progress: (now) => {
        const index = sizes.findIndex((v) => v > now) - 1;
        if (index >= 0) {
          onUploaded(items[index]);
        }
      }
    });

    onUploaded(items[items.length - 1]);

    items.forEach((item, i) => {
      setTimeout(() => {
        photoUploadApi({ path: item.path });
      }, 500 * i);
    })
  }
}
