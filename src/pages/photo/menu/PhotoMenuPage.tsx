import CommonContainer from 'src/components/common/header/CommonContainer';
import CommonMenu from 'src/components/common/header/CommonMenu';
import PhotoHeader from 'src/components/photo/PhotoHeader';

export default function PhotoMenuPage() {
  return (
    <div id="PhotoMenuPage">
      <PhotoHeader title="Menu" />
      <CommonContainer>
        <CommonMenu />
      </CommonContainer>
    </div>
  )
}
