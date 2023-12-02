import queryString from 'query-string';

import { ApparelUpdatePageParams } from './update/ApparelUpdateHooks';
import { ApparelViewerPageParams } from './viewer/ApparelViewerHooks';

const { stringifyUrl } = queryString;

const ApparelRoutes = {
  list: '/',

  detailRoute: '/apparels/:apparelId',
  detail: (apparelId: string) => `/apparels/${apparelId}`,

  viewerRoute: '/apparels/:apparelId/viewer',
  viewer: ({ apparelId, ...query }: ApparelViewerPageParams) =>
    stringifyUrl({ url: `/apparels/${apparelId}/viewer`, query }),

  updateRoute: '/apparels/:apparelId/edit',
  update: ({ apparelId }: ApparelUpdatePageParams) => `/apparels/${apparelId}/edit`,

  create: '/apparels/add',

  categoryList: '/categories',

  categoryDetailRoute: '/categories/:category',
  categoryDetail: (category: string) => `/categories/${category}`,

  brandList: '/brands',

  brandDetailRoute: '/brands/:brand',
  brandDetail: (brand: string) => `/brands/${brand}`,
};

export default ApparelRoutes;
