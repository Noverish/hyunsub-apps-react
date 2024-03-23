import photoDetailApi from 'src/api/photo/photo-detail';
import { PhotoPreview } from 'src/model/photo';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';

function convertSlide(preview: PhotoPreview | null): CommonViewerData {
  if (!preview) {
    return { type: 'photo' };
  }

  const { type, thumbnail, ext } = preview;

  if (type === 'PHOTO') {
    return {
      type: 'photo',
      url: thumbnail.replace('thumbnail', 'original').replace('jpg', ext) + '?size=1024',
    };
  }

  return {
    type: 'video',
    url: thumbnail.replace('thumbnail', 'video').replace('.jpg', '.mp4'),
  };
}

async function downloadPhoto(photoId: string, albumId?: string) {
  const photo = await photoDetailApi.fetch({ photoId, albumId });

  const url = `${photo.original}?downloadName=${encodeURI(photo.fileName)}`;
  const link = document.createElement('a');
  link.href = url;
  link.download = photo.fileName;
  link.click();
}

const PhotoHooks = {
  convertSlide,
  downloadPhoto,
};

export default PhotoHooks;
