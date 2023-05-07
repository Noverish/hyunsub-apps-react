import { t } from 'i18next';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDriveExplorerPath } from 'src/components/drive/explorer/DriveExplorerHooks';
import DriveRoutes from 'src/pages/drive/DriveRoutes';

import './DriveExplorerBreadcrumb.scss';

export default function DriveExplorerBreadcrumb() {
  const [path] = useDriveExplorerPath();

  const items = path.split('/')
    .filter(v => v.length > 0)
    .map((v, i, arr) => {
      const key = i + v;
      const active = i === arr.length - 1;
      const targetPath = '/' + arr.slice(0, i + 1).join('/');
      const to = DriveRoutes.explorer(targetPath);

      return (
        <Breadcrumb.Item key={key} active={active} linkAs={Link} linkProps={{ to }}>
          <span>{v}</span>
        </Breadcrumb.Item>
      )
    });

  return (
    <Breadcrumb className="DriveExplorerBreadcrumb">
      <Breadcrumb.Item
        linkAs={Link}
        linkProps={{ to: DriveRoutes.explorer('/') }}
      >
        {t('drive.DriveExplorerBreadcrumb.home')}
      </Breadcrumb.Item>
      {items}
    </Breadcrumb>
  )
}
