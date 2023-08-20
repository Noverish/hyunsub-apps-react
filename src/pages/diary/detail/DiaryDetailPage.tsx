import { useParams } from 'react-router-dom';

import diaryDetailApi from 'src/api/diary/diary-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';

interface Props {}

export default function DiaryDetailPage(props: Props) {
  const date = useParams().date as string;

  const diary = diaryDetailApi.useApi({ date });

  const summaryElement = diary.summary ? <p>{diary.summary}</p> : undefined;

  return (
    <div className="DiaryDetailPage">
      <MobileHeader title={date} back />
      <CommonContainer>
        <h1>{date}</h1>
        {summaryElement}
        <p>{diary.content}</p>
      </CommonContainer>
    </div>
  );
}
