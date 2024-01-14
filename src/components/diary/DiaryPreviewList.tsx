import DiaryPreviewItem from './DiaryPreviewItem';
import { DiaryPreview } from 'src/model/diary';

interface Props {
  diaries: DiaryPreview[];
}

export default function DiaryPreviewList({ diaries }: Props) {
  const elements = diaries.map((v) => <DiaryPreviewItem key={v.date} diary={v} />);

  return <div className="DiaryPreviewList d-grid gap-3">{elements}</div>;
}
