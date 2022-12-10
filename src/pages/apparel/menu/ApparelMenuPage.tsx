import ApparelHeader from 'src/components/apparel/ApparelHeader';
import CommonContainer from 'src/components/common/header/CommonContainer';
import CommonMenu from 'src/components/common/header/CommonMenu';

export default function ApparelMenuPage() {
  return (
    <div id="ApparelMenuPage">
      <ApparelHeader title="Menu" />
      <CommonContainer>
        <CommonMenu />
      </CommonContainer>
    </div>
  )
}
