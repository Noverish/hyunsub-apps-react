import { t } from 'i18next';

import ApparelForm from 'src/components/apparel/form/ApparelForm';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelAddPage() {
  setDocumentTitle(t('apparel.page.add.title'));

  return (
    <div id="ApparelAddPage">
      <MobileHeader title={t('add')} />
      <CommonContainer>
        <h1 className="mb-3">{t('apparel.page.add.title')}</h1>
        <ApparelForm />
      </CommonContainer>
    </div>
  );
}
