import { t } from 'i18next';
import { useContext } from 'react';
import ButtonListModal, { ButtonListModalItem } from 'src/components/common/ButtonListModal';
import { PhotoSelectContext } from './PhotoSelectContext';

export default function PhotoSelectActionModal() {
  const [state, setState] = useContext(PhotoSelectContext);

  const items: ButtonListModalItem[] = [
    {
      title: t('PhotoListView.add-to-album'),
      onClick: () => setState({ showAlbumSelectModal: true }),
    },
    {
      title: t('delete'),
      onClick: () => {},
    }
  ]

  return (
    <ButtonListModal
      className="VideoSortModal"
      show={state.showSelectActionModal}
      onHide={() => setState({ showSelectActionModal: false })}
      items={items}
    />
  )
}
