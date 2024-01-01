import { t } from 'i18next';

import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function DutchSearchPage() {
  return <CommonLayout className="DutchSearchPage" title={t('CommonNavigation.search')}></CommonLayout>;
}
