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

export interface Apparel {
  id: string;
  itemNo: string;
  name: string;
  brand: string;
  type: string;
  size: string;
  color: string;
  originPrice: number;
  discountPrice?: number;
  material: string;
  size2: string;
  buyDt: string;
  buyLoc: string;
  makeDt?: string;
  images: ApparelImage[];
}
