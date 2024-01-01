import { t } from 'i18next';

import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function DutchHomePage() {
  return <CommonLayout className="DutchHomePage" title={t('DutchNavigation.home')}></CommonLayout>;
}
