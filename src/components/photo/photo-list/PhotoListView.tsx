import { t } from 'i18next';
import { Button, Row } from "react-bootstrap";
import { useToggleSelectMode } from 'src/components/photo/photo-list/PhotoListHooks';
import PhotoPreviewView from "src/components/photo/PhotoPreviewView";
import { PhotoPreview } from 'src/model/photo';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { usePhotoListSelect } from './PhotoListHooks';

import './PhotoListView.scss';

interface Props {
  previews: PhotoPreview[];
  itemHref: (preview: PhotoPreview) => string;
}

export default function PhotoListView({ previews, itemHref: href }: Props) {
  const isMobile = useBreakpointMobile();

  const { selects, onSelect, selectMode } = usePhotoListSelect(previews);
  const toggleSelectMode = useToggleSelectMode();

  const elements = previews.map(v => (
    <PhotoPreviewView
      key={v.id}
      preview={v}
      href={href(v)}

      selectMode={selectMode}
      onSelect={onSelect}
      selected={selects.indexOf(v) >= 0}
    />
  ));

  const buttonContainer = selectMode
    ? (
      <div className="button_container">
        <Button className="clear_select" variant="secondary" onClick={toggleSelectMode}>{t('cancel')}</Button>
        <span className="select_status">{t('n-selected', [selects.length])}</span>
        <Button className="add_to_album">{t('PhotoListView.add-to-album')}</Button>
      </div>
    ) : (
      <div className="button_container">
        <Button className="toggle_select" onClick={toggleSelectMode}>{t('select')}</Button>
      </div>
    )

  return (
    <div className="PhotoListView">
      {isMobile || buttonContainer}
      <Row className="g-1 row-cols-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-6">
        {elements}
      </Row>
    </div>
  )
}
