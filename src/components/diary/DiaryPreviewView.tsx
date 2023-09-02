import { Card } from 'react-bootstrap';

import { lang } from 'src/i18n';
import { Diary } from 'src/model/diary';
import DiaryRoutes from 'src/pages/diary/DiaryRoutes';
import router from 'src/pages/router';

import './DiaryPreviewView.scss';

interface Props {
  diary: Diary;
  query?: string;
}

export default function DiaryPreviewView({ diary, query }: Props) {
  const date = new Date(diary.date);
  const weekday = date.toLocaleString(lang, { weekday: 'short' });

  const onClick = () => {
    router.navigate(DiaryRoutes.detail({ date: diary.date, query }));
  };

  const { summary, content } = diary;

  const summaryElement = summary ? (
    <>
      <div>{summary}</div>
      <hr className="my-2" />
    </>
  ) : undefined;

  const contentElement = query ? highlightQuery(content, query) : <span>{processLastPart(content, 100)}</span>;

  return (
    <Card className="DiaryPreviewView" onClick={onClick}>
      <Card.Header>
        {diary.date} ({weekday})
      </Card.Header>
      <Card.Body>
        {summaryElement}
        {contentElement}
      </Card.Body>
    </Card>
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

    let content = '';
    if (i === 0) {
      content = processFirstPart(part);
    } else if (i === parts.length - 1) {
      content = processLastPart(part);
    } else {
      content = processMiddlePart(part);
    }

    result.push(<span key={`content_${i}`}>{content}</span>);
  }

  return result;
}

function processFirstPart(part: string): string {
  const size = 30;
  if (part.length <= size) {
    return part;
  }

  const p = part.slice(-size, part.length);
  return '... ' + p;
}

function processLastPart(part: string, size: number = 30): string {
  if (part.length <= size) {
    return part;
  }

  const p = part.slice(0, size);
  return p + ' ...';
}

function processMiddlePart(part: string): string {
  const size = 30;
  if (part.length <= size * 2) {
    return part;
  }

  const p1 = part.slice(0, size);
  const p2 = part.slice(-size, part.length);
  return p1 + ' ... ' + p2;
}
