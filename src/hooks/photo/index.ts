import { PhotoPreview } from 'src/model/photo';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';

function toViewerData(preview: PhotoPreview | null): CommonViewerData {
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

function convertData(previews: (PhotoPreview | null)[]): CommonViewerData[] {
  return previews.map((v) => toViewerData(v));
}

const PhotoHooks = {
  convertData,
};

export default PhotoHooks;
