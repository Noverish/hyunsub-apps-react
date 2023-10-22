import { MeetFriend } from 'src/model/friend';

export interface DiaryPreview {
  date: string;
  summary: string;
  content: string;
}

export interface Diary {
  date: string;
  summary: string;
  content: string;
  friends: MeetFriend[];
}
