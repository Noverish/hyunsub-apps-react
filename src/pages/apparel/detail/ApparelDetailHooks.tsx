import { t } from 'i18next';

import apparelDeleteApi from 'src/api/apparel/apparel-delete';
import { useUrlParams } from 'src/hooks/url-params';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface ApparelDetailPageParams {
  apparelId: string;
}

function usePageParams(): ApparelDetailPageParams {
  const [apparelId] = useUrlParams('apparelId');
  return { apparelId };
}

function useDelete() {
  const { apparelId } = usePageParams();

  return async () => {
    if (!window.confirm(t('msg.delete-confirm') as string)) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await apparelDeleteApi({ apparelId });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const ApparelDetailHooks = {
  usePageParams,
  useDelete,
};

export default ApparelDetailHooks;
