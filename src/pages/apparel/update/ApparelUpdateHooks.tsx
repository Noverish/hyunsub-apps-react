import apparelUpdateApi from 'src/api/apparel/apparel-update';
import ApparelFormHooks from 'src/components/apparel/form/ApparelFormHooks';
import { useUrlParams } from 'src/hooks/url-params';
import { ApparelInfo } from 'src/model/apparel';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface ApparelUpdatePageParams {
  apparelId: string;
}

function usePageParams(): ApparelUpdatePageParams {
  const [apparelId] = useUrlParams('apparelId');
  return { apparelId };
}

function useUpdate() {
  const { apparelId } = usePageParams();
  const uploadImage = ApparelFormHooks.useUploadImage();

  return async (info: ApparelInfo, uploadFiles: File[], deletes: string[]) => {
    dispatch(GlobalActions.update({ loading: true }));

    const uploads = await uploadImage(uploadFiles);

    await apparelUpdateApi({ id: apparelId, info, uploads, deletes });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const ApparelUpdateHooks = {
  usePageParams,
  useUpdate,
};

export default ApparelUpdateHooks;
