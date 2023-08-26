import { generateQuery } from '../generate-api';

export interface DiaryStatusMonthParams {
  year: number;
  month: number;
}

const diaryStatusMonthApi = generateQuery<DiaryStatusMonthParams, string[]>({
  api: (params) => ({
    url: `/api/v1/status/month`,
    method: 'GET',
    params,
  }),
  key: () => 'diaryStatusMonthApi',
});

export default diaryStatusMonthApi;
