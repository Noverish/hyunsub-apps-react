import { Album } from 'src/model/photo';
import { generateValueContext } from 'src/utils/context';

export const [AlbumDetailContext, AlbumDetailProvider, useAlbumDetailContext] = generateValueContext<Album>();
