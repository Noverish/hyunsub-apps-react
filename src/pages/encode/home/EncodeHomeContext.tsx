import { Dispatch } from "@reduxjs/toolkit";
import { EncodeStatus } from 'src/model/encode';

export const startEncodeStatusPolling = () => async (dispatch: Dispatch) => {
  const es = new EventSource('/api/v1/encode/status');
  es.onmessage = (event: MessageEvent<string>) => {
    const status: EncodeStatus = JSON.parse(event.data);
  }
}
