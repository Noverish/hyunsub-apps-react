import { t } from 'i18next';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DiaryRoutes from 'src/pages/diary/DiaryRoutes';
import DiaryDetailHooks from 'src/pages/diary/detail/DiaryDetailHooks';
import DiaryMeetFriendView from 'src/pages/diary/detail/components/DiaryMeetFriendView';

export default function DiaryDetailView() {
  const { date, diary, query } = DiaryDetailHooks.usePageData();

  if (!diary) {
    const createUrl = DiaryRoutes.create(date);

    return (
      <div className="DiaryDetailView">
        <p>{t('DiaryDetailPage.empty-msg')}</p>
        <Link to={createUrl}>
          <Button>{t('DiaryCalendarPage.create')}</Button>
        </Link>
      </div>
    );
  }

  const { summary, content } = diary;

  const contentElement = query ? highlightQuery(content, query) : <p>{content}</p>;

  return (
    <div className="DiaryDetailView">
      <p>{summary}</p>
      {contentElement}
      {diary.friends.length && <DiaryMeetFriendView meetFriends={diary.friends} />}
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
