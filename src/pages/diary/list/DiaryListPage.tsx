import { t } from 'i18next';

import DiaryListHooks from './DiaryListHooks';
import DiarySearchInput from './elements/DiarySearchInput';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DiaryPreviewView from 'src/components/diary/DiaryPreviewView';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryListPage() {
  setDocumentTitle(t('DiaryListPage.title'));

  // hooks
  const { query, data } = DiaryListHooks.usePageData();
  const search = DiaryListHooks.useSearch();

  // elements
  const elements = data.map((v) => <DiaryPreviewView key={v.date} diary={v} />);

  return (
    <div className="DiaryListPage">
      <MobileHeader title={t('DiaryListPage.title')} />
      <CommonContainer>
        <DiarySearchInput onSearch={search} query={query} />
        <div className="d-grid gap-3">{elements}</div>
      </CommonContainer>
    </div>
  );
}
