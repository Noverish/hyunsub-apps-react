import { DriveWindowStatus } from 'src/model/drive';
import { store, useSelector } from 'src/redux';

export function useDriveStatus(index?: number): DriveWindowStatus {
  return useSelector(s => s.drive.status[index || 0]) || { path: '/', selects: [] };
}

export function getDriveStatus(index?: number): DriveWindowStatus {
  return store.getState().drive.status[index || 0] || { path: '/', selects: [] };
}
