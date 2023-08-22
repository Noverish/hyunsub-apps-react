import { generateApi } from 'src/api/generate-api';
import { Diary } from 'src/model/diary';

const diaryModifyApi = generateApi<Diary, Diary>((params) => ({
  url: `/api/v1/diaries/${params.date}`,
  method: 'POST',
  data: params,
}));

export default diaryModifyApi;
