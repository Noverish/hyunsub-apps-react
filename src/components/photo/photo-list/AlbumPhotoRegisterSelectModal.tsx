import { useContext } from 'react';

import AlbumSelectModal from 'src/components/photo/modal/AlbumSelectModal';
import PhotoActionHooks from 'src/components/photo/photo-list/PhotoActionHooks';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';

export default function AlbumPhotoRegisterSelectModal() {
  const [{ showAlbumSelectModal }, setState] = useContext(PhotoSelectContext);
  const albumPhotoRegister = PhotoActionHooks.useAlbumPhotoRegister();

  return (
    <AlbumSelectModal
      show={showAlbumSelectModal}
      onHide={() => setState({ showAlbumSelectModal: false })}
      onClick={albumPhotoRegister}
    />
  );
}
