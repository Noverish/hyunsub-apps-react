import { Row } from "react-bootstrap";
import albumListV2Api from "src/api/photo/album-list-v2"
import CommonContainer from "src/components/common/header/CommonContainer";
import MobileHeader from "src/components/common/header/MobileHeader";
import AlbumPreviewView from "src/components/photo/AlbumPreviewView";
import PhotoRoutes from "../PhotoRoutes";

interface Props {

}

export default function AlbumList2Page(props: Props) {
  const albums = albumListV2Api.useApi({});

  const elements = albums.map(v => (
    <AlbumPreviewView key={v.id} preview={v} onClick={PhotoRoutes.albumDetail2(v.id)} />
  ))

  return (
    <div className="AlbumList2Page">
      <MobileHeader title="AlbumList2Page" />
      <CommonContainer>
        <Row className="g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">
          {elements}
        </Row>
      </CommonContainer>
    </div>
  )
}
