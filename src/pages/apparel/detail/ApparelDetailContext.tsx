import { Dispatch } from "@reduxjs/toolkit";
import apparelImageUpload from "src/api/apparel/apparel-image-upload";

export const apparelImageUploadAction = (apparelId: string, images: File[]) => async (dispatch: Dispatch) => {
  for (const image of images) {
    const result = await apparelImageUpload({ apparelId, image });
    console.log(result);
  }
}
