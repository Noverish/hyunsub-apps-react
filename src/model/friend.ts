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
}

export interface FriendTagPreview {
  name: string;
  count: number;
}

export interface FriendTag {
  name: string;
  count: number;
  friends: FriendPreview[];
}
