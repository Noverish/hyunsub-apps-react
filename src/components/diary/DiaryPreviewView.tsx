import { Card } from 'react-bootstrap';

import { useWeekday } from 'src/hooks/token';
import { Diary } from 'src/model/diary';
import DiaryRoutes from 'src/pages/diary/DiaryRoutes';
import router from 'src/pages/router';

interface Props {
  diary: Diary;
}

export default function DiaryPreviewView({ diary }: Props) {
  const date = new Date(diary.date);
  const weekday = useWeekday(date);

  const onClick = () => {
    router.navigate(DiaryRoutes.detail(diary.date));
  };

  const summary = diary.summary ? (
    <>
      <p>{diary.summary}</p>
      <hr />
    </>
  ) : undefined;

  return (
    <Card className="DiaryPreviewView" onClick={onClick}>
      <Card.Header>
        {diary.date} ({weekday})
      </Card.Header>
      <Card.Body>
        {summary}
        <p className="mb-0">{diary.content.substring(0, 100)} ...</p>
      </Card.Body>
    </Card>
  );
}
