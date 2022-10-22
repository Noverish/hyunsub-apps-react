import { Dispatch } from "@reduxjs/toolkit";

export const startEncodeStatusPolling = () => async (dispatch: Dispatch) => {
  const es = new EventSource('/api/v1/encode/status');
  es.onmessage = (event) => {
    console.log(event);
  }
}
