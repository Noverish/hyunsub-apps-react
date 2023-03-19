import { t } from 'i18next';
import flatten from 'lodash/flatten';
import { Button, Row } from "react-bootstrap";
import photoListApi from 'src/api/photo/photo-list';
import PhotoPreviewView from "src/components/photo/PhotoPreviewView";
import { useScrollBottom } from 'src/utils';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import PhotoRoutes from "../../PhotoRoutes";
import { usePhotoListSelect } from "../PhotoListHooks";

import './PhotoListView.scss';

interface Props {

}

export default function PhotoListView(props: Props) {
  const { data, fetchNextPage, isFetching } = photoListApi.useInfiniteApi({});
  const isMobile = useBreakpointMobile();

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const previews = flatten(data?.pages.map(v => v.data) ?? []);

  const { selects, onSelect, selectMode, toggleSelectMode, onCancel } = usePhotoListSelect(previews);

  const elements = previews.map(v => (
    <PhotoPreviewView
      key={v.id}
      preview={v}
      href={PhotoRoutes.photoViewer(v.id)}

      selectMode={selectMode}
      onSelect={onSelect}
      selected={selects.indexOf(v) >= 0}
    />
  ));

  const buttonContainer = selectMode
    ? (
      <div className="button_container">
        <Button className="clear_select" variant="secondary" onClick={onCancel}>{t('cancel')}</Button>
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
