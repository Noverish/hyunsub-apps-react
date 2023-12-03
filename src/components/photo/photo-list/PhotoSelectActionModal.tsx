import { t } from 'i18next';
import { useContext } from 'react';

import PhotoListHooks, { useAlbumThumbnailRegister } from './PhotoListHooks';
import { PhotoSelectContext } from './PhotoSelectContext';
import ButtonListModal, { ButtonListModalItem } from 'src/components/common/ButtonListModal';

interface Props {
  albumId?: string;
}

export default function PhotoSelectActionModal({ albumId }: Props) {
  const [state, setState] = useContext(PhotoSelectContext);

  const registerThumbnail = useAlbumThumbnailRegister(albumId);
  const photoDeleteBulk = PhotoListHooks.usePhotoDeleteBulk();

  const items: ButtonListModalItem[] = [
    {
      title: t('PhotoListView.add-to-album'),
      onClick: () => setState({ showAlbumSelectModal: true }),
    },
    {
      title: t('PhotoListView.delete-from-album'),
      onClick: () => {},
    },
    {
      title: t('PhotoListView.delete-photo'),
      onClick: () => photoDeleteBulk(),
    },
  ];

  if (registerThumbnail) {
    items.push({
      title: t('photo.register-thumbnail'),
      onClick: registerThumbnail,
    });
  }

  return (
    <ButtonListModal
      className="VideoSortModal"
      show={state.showSelectActionModal}
      onHide={() => setState({ showSelectActionModal: false })}
      items={items}
    />
  );
}
