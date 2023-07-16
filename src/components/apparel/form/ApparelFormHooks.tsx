import { extname } from 'path-browserify';
import { useContext } from 'react';

import { ApparelFormContext } from './ApparelFormContext';
import apparelCreateApi from 'src/api/apparel/apparel-create';
import apparelDetailApi, { ApparelDetailResult } from 'src/api/apparel/apparel-detail';
import apparelListApi from 'src/api/apparel/apparel-list';
import apparelUpdateApi from 'src/api/apparel/apparel-update';
import fileUploadApi from 'src/api/file/file-upload-multipart';
import { Apparel, ApparelUploadImageParams } from 'src/model/apparel';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export function useApparelFormSubmit(isEdit: boolean) {
  const [{ uploads, deletes }] = useContext(ApparelFormContext);

  return async (apparel: Apparel) => {
    dispatch(GlobalActions.update({ loading: true }));

    let uploadParams: ApparelUploadImageParams[] = uploads.map((v) => ({
      nonce: '',
      ext: extname(v.name).replace('.', ''),
    }));

    if (uploads.length > 0) {
      await fileUploadApi({
        files: uploads.map((v) => ({ file: v, path: v.name, type: v.type })),
        callback: (result) => {
          console.log({ result });
          uploadParams[result.index].nonce = result.nonce;
        },
      });
    }

    const result: ApparelDetailResult = isEdit
      ? await apparelUpdateApi({ apparel, uploads: uploadParams, deletes })
      : await apparelCreateApi({ apparel, uploads: uploadParams });

    apparelDetailApi.setCache({ apparelId: result.apparel.id }, result);

    if (!isEdit) {
      apparelListApi.insertCache(
        {},
        {
          id: result.apparel.id,
          name: result.apparel.name,
          thumbnail: result.images[0]?.url,
        }
      );
    }

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(ApparelRoutes.detail(result.apparel.id));
  };
}
