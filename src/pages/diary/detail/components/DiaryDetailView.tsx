import { Diary } from 'src/model/diary';

interface Props {
  diary: Diary;
}

export default function DiaryDetailView({ diary }: Props) {
  const date = diary.date;
  const summaryElement = diary.summary ? <p>{diary.summary}</p> : undefined;

  return (
    <div className="DiaryDetailView">
      <h1>{date}</h1>
      {summaryElement}
      <p>{diary.content}</p>
    </div>
  );
}
