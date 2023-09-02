import { t } from 'i18next';

import diaryDetailApi from 'src/api/diary/diary-detail';
import DiaryDetailHooks from 'src/pages/diary/detail/DiaryDetailHooks';

export default function DiaryDetailView() {
  const { date, query } = DiaryDetailHooks.usePageData();

  const diary = diaryDetailApi.useApi({ date });

  if (!diary) {
    return (
      <div className="DiaryDetailView">
        <p>{t('DiaryDetailPage.empty-msg')}</p>
      </div>
    );
  }

  const { summary, content } = diary;

  const contentElement = query ? highlightQuery(content, query) : <span>{content}</span>;

  return (
    <div className="DiaryDetailView">
      <p>{summary}</p>
      {contentElement}
    </div>
  );
}

function highlightQuery(content: string, query: string): JSX.Element[] {
  const result: JSX.Element[] = [];

  const parts = content.split(query);
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i !== 0) {
      result.push(
        <span key={`query_${i}`} className="query">
          {query}
        </span>
      );
    }

    result.push(<span key={`content_${i}`}>{part}</span>);
  }

  return result;
}
