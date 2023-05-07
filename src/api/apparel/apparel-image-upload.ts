import { AxiosRequestConfig } from 'axios';

import { generateApi } from '../generate-api';
import { ApparelImage } from 'src/model/apparel';

export interface ApparelImageUploadParams {
  apparelId: string;
  image: File;
}

const apparelImageUploadApi = generateApi<ApparelImageUploadParams, ApparelImage>((params) => {
  const formData = new FormData();
  formData.append('image', params.image);

  return {
    url: `/api/v1/apparels/${params.apparelId}/images`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } as AxiosRequestConfig;
});

export default apparelImageUploadApi;
