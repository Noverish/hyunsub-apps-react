import { PhotoPreview } from './photo';
import { FriendPreview } from 'src/model/friend';

export interface DiaryPreview {
  date: string;
  summary: string;
  content: string;
  friends: FriendPreview[];
}

export interface Diary {
  date: string;
  summary: string;
  content: string;
  friends: FriendPreview[];
  photoNum: number;
  photos: PhotoPreview[];
}
