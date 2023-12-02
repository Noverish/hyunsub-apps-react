import { t } from 'i18next';

import ApparelCreateHooks from './ApparelCreateHooks';
import ApparelForm from 'src/components/apparel/form/ApparelForm';
import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function ApparelCreatePage() {
  const create = ApparelCreateHooks.useCreate();

  return (
    <CommonLayout className="ApparelCreatePage" title={t('ApparelCreatePage.title')} back>
      <ApparelForm onComplete={create} />
    </CommonLayout>
  );
}
