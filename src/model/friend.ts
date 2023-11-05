export interface FriendPreview {
  id: string;
  name: string;
}

export interface Friend {
  id: string;
  name: string;
  birthday: string | null;
  tags: string[];
  description: string | null;
  meets: string[];
}

export interface FriendTagPreview {
  name: string;
  count: number;
}
