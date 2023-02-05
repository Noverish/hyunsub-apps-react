import MenuAppsView from 'src/components/common/menu/MenuAppsView';
import MenuProfileView from 'src/components/common/menu/MenuProfileView';

export default function MenuCommonSection() {
  return (
    <div className="MenuCommonSection">
      <MenuProfileView />
      <hr />
      <MenuAppsView />
      <hr />
    </div>
  )
}
