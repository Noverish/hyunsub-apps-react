import { generateApi } from '../generate-api';
import { Diary } from 'src/model/diary';

const diaryCreateApi = generateApi<Diary, Diary>((params) => ({
  url: `/api/v1/diaries`,
  method: 'POST',
  data: params,
}));

export default diaryCreateApi;
