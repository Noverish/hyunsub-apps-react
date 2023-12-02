export interface ApparelPreview {
  id: string;
  name: string;
  thumbnail: string;
}

export interface ApparelImage {
  imageId: string;
  apparelId: string;
  url: string;
}

export interface ApparelInfo {
  itemNo?: string;
  name: string;
  brand?: string;
  category: string;
  size?: string;
  color?: string;
  originPrice?: number;
  discountPrice?: number;
  material?: string;
  size2?: string;
  buyDt?: string;
  buyLoc?: string;
  makeDt?: string;
  discarded: boolean;
}

export interface Apparel {
  id: string;
  info: ApparelInfo;
  images: ApparelImage[];
}
