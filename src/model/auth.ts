export interface AdminUser {
  idNo: string;
  username: string;
  authorities: number[];
}

export interface AdminAuthority {
  id: number;
  name: string;
}

export interface Profile {
  username: string;
  historyNum: number;
  deviceNum: number;
}
