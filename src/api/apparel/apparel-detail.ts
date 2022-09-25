import { Apparel, ApparelImage } from "src/model/apparel";
import { generateQuery } from "../generate-api";
import QueryClient from 'src/api/query-client';

interface ApparelDetailParams {
  apparelId: string;
}

const apparelDetail = generateQuery<ApparelDetailParams, Apparel>({
  api: (params) => ({
    url: `/api/v1/apparels/${params.apparelId}`,
    method: 'GET',
  }),
  key: (params) => `apparel/${params.apparelId}`,
});

export default apparelDetail;

export function addApparelDetailImageCache(apparelImage: ApparelImage) {
  const key = apparelDetail.key({ apparelId: apparelImage.apparelId });
  QueryClient.setQueryData<Apparel>(key, (apparel) => {
    if (!apparel) {
      return apparel;
    }

    const images = [...apparel.images, apparelImage];
    return {
      ...apparel,
      images,
    }
  })
}

export function deleteApparelDetailImageCache(apparelImage: ApparelImage) {
  const key = apparelDetail.key({ apparelId: apparelImage.apparelId });
  QueryClient.setQueryData<Apparel>(key, (apparel) => {
    if (!apparel) {
      return apparel;
    }

    const images = apparel.images.filter(v => v.imageId !== apparelImage.imageId);
    return {
      ...apparel,
      images,
    }
  })
}
