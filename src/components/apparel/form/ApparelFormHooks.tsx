import { extname } from 'path-browserify';

import fileUploadApi from 'src/api/file/file-upload-multipart';
import { generateRandomString } from 'src/utils';

function useUploadImage() {
  return async (uploads: File[]): Promise<string[]> => {
    if (uploads.length === 0) {
      return [];
    }

    const files = uploads.map((file) => {
      const nonce = generateRandomString(8);
      const ext = extname(file.name);

      return {
        file: file,
        type: file.type,
        path: `apparel_${nonce}${ext}`,
      };
    });

    await fileUploadApi({ files });

    return files.map((v) => v.path);
  };
}

const ApparelFormHooks = {
  useUploadImage,
};

export default ApparelFormHooks;
