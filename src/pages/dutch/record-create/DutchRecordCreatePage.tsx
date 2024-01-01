import { t } from 'i18next';

import CommonLayout from 'src/components/common/layout/CommonLayout';
import DutchRecordForm from 'src/components/dutch/form/DutchRecordForm';

export default function DutchRecordCreatePage() {
  return (
    <CommonLayout className="DutchRecordCreatePage" title={t('DutchRecordCreatePage.title')}>
      <DutchRecordForm />
    </CommonLayout>
  );
}
