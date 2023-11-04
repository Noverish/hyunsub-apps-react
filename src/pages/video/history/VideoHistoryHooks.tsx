import { useContext } from 'react';

import videoHistoryDeleteBulkApi from 'src/api/video/video-history-delete-bulk';
import { ChooseContext } from 'src/context/choose/ChooseContext';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

const useDelete = () => {
  const { clearChooseContext, choices } = useContext(ChooseContext);

  return async () => {
    if (choices.length === 0) {
      clearChooseContext();
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await videoHistoryDeleteBulkApi({ videoIds: choices });

    clearChooseContext();

    dispatch(GlobalActions.update({ loading: false }));
  };
};

const VideoHistoryHooks = {
  useDelete,
};

export default VideoHistoryHooks;
