import { useContext } from 'react';

import PhotoListHooks from '../PhotoListHooks';
import AlbumSelectModal from 'src/components/photo/modal/AlbumSelectModal';
import { PhotoListContext } from 'src/pages/photo/photo-list/PhotoListContext';

export default function AlbumPhotoRegisterSelectModal() {
  const [{ showAlbumSelectModal }, setState] = useContext(PhotoListContext);
  const albumPhotoRegister = PhotoListHooks.useAddToAlbum();

  return (
    <AlbumSelectModal
      show={showAlbumSelectModal}
      onHide={() => setState({ showAlbumSelectModal: false })}
      onClick={albumPhotoRegister}
    />
  );
}
