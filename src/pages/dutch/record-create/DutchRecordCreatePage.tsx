import { t } from 'i18next';

import DutchRecordCreateHooks from './DutchRecordCreateHooks';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DutchRecordForm from 'src/components/dutch/form/DutchRecordForm';

export default function DutchRecordCreatePage() {
  const create = DutchRecordCreateHooks.useCreate();

  return (
    <CommonLayout className="DutchRecordCreatePage" title={t('DutchRecordCreatePage.title')} back>
      <DutchRecordForm onComplete={create} />
    </CommonLayout>
  );
}
