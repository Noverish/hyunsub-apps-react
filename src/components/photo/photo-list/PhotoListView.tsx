import { t } from 'i18next';
import { useContext, useMemo } from 'react';
import { Button, Row } from 'react-bootstrap';

import { usePhotoListSelect } from './PhotoListHooks';
import PhotoPreviewView from './PhotoPreviewView';
import PhotoSelectActionModal from './PhotoSelectActionModal';
import { PhotoSelectContext } from './PhotoSelectContext';
import { PhotoPreview } from 'src/model/photo';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';

import './PhotoListView.scss';

interface Props {
  albumId?: string;
  previews: PhotoPreview[];
  itemHref: (preview: PhotoPreview) => string;
}

export default function PhotoListView({ albumId, previews, itemHref: href }: Props) {
  // hooks
  const isMobile = useBreakpointMobile();
  const setState = useContext(PhotoSelectContext)[1];
  const { selects, onSelect, selectMode } = usePhotoListSelect(previews);

  // functions
  const navigateAlbumUpload = () => {
    if (albumId) {
      router.navigate(PhotoRoutes.albumUpload(albumId));
    } else {
      router.navigate(PhotoRoutes.photoUpload);
    }
  };

  const onCheckboxClick = () => {
    if (selects.length === 0) {
      setState({
        selectMode: true,
        selects: [...previews],
      });
      return;
    }

    setState({
      selectMode: false,
      selects: [],
      lastSelected: undefined,
    });
  };

  const showSelectModal = () => setState({ showSelectActionModal: true });

  // elements
  const elements = previews.map((v) => <PhotoPreviewView key={v.id} preview={v} href={href(v)} onSelect={onSelect} />);

  const squareIcon = useMemo(() => {
    if (selects.length === previews.length) {
      return 'fas fa-check-square';
    } else if (selects.length === 0) {
      return 'far fa-square';
    } else {
      return 'fas fa-minus-square';
    }
  }, [previews, selects]);

  const topBtnsForDesktop = (
    <div className="button_container">
      <Button onClick={onCheckboxClick}>
        <i className={squareIcon} />
      </Button>
      <Button onClick={navigateAlbumUpload}>{t('upload')}</Button>
      {selectMode && (
        <>
          <div className="vr"></div>
          <Button onClick={showSelectModal}>
            <i className="fas fa-ellipsis-h" />
          </Button>
          <span className="select_status">{t('n-selected', [selects.length])}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="PhotoListView">
      {isMobile || topBtnsForDesktop}
      <Row className="g-1 row-cols-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-6">{elements}</Row>
      <PhotoSelectActionModal albumId={albumId} />
    </div>
  );
}
