import ApparelRoutes from '../ApparelRoutes';
import apparelCreateApi from 'src/api/apparel/apparel-create';
import ApparelFormHooks from 'src/components/apparel/form/ApparelFormHooks';
import { ApparelInfo } from 'src/model/apparel';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useCreate() {
  const uploadImage = ApparelFormHooks.useUploadImage();

  return async (info: ApparelInfo, uploadFiles: File[]) => {
    dispatch(GlobalActions.update({ loading: true }));

    const uploads = await uploadImage(uploadFiles);

    const result = await apparelCreateApi({ info, uploads });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(ApparelRoutes.detail(result.id), { replace: true });
  };
}

const ApparelCreateHooks = {
  useCreate,
};

export default ApparelCreateHooks;
