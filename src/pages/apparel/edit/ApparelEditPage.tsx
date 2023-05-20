import { t } from 'i18next';
import { useEffect } from 'react';

import apparelDetailApi from 'src/api/apparel/apparel-detail';
import ApparelForm from 'src/components/apparel/form/ApparelForm';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { useUrlParams } from 'src/hooks/url-params';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelEditPage() {
  const [apparelId] = useUrlParams('apparelId');

  const apparelDetail = apparelDetailApi.useApi({ apparelId });
  const title = t('apparel.page.edit.title', [apparelDetail.apparel.name]);

  useEffect(() => {
    setDocumentTitle(title);
  }, [title]);

  return (
    <div id="ApparelEditPage">
      <MobileHeader title={title} back />
      <CommonContainer>
        <h1 className="mb-3">{title}</h1>
        <ApparelForm apparel={apparelDetail} />
      </CommonContainer>
    </div>
  );
}
