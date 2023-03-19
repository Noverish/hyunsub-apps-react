import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import albumDetailApi from 'src/api/photo/album-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import PhotoUploadList from 'src/components/photo/PhotoUploadList';
import routes from 'src/pages/photo/PhotoRoutes';
import { useDispatch } from 'src/redux';
import { setDocumentTitle } from 'src/utils/services';
import { albumUploadAction, prepareUploadAction } from './AlbumUploadContext';

import './AlbumUploadPage.scss';

export default function AlbumUploadPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const albumId = parseInt(useParams().albumId!!, 10);
  const filesRef = useRef<File[]>([]);

  const album = albumDetailApi.useApi({ albumId });

  useEffect(() => {
    setDocumentTitle(t('photo.page.album-upload.title', [album.name]));
  }, [t, album.name]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    dispatch(prepareUploadAction(files));
    filesRef.current = files;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = filesRef.current;
    if (files.length === 0) {
      alert(t('photo.page.album-upload.msg.empty-upload'));
      return;
    }

    dispatch(albumUploadAction(files, albumId));
  };

  return (
    <div id="AlbumUploadPage">
      <MobileHeader title="Upload to Album" />
      <CommonContainer>
        <Link to={routes.albumDetail(albumId.toString())} style={{ float: 'right' }}>
          <Button variant='secondary'>{t('photo.page.album-upload.back-to-album')}</Button>
        </Link>
        <h1>{album.name}</h1>
        <hr />
        <Form id="album_upload_form" onSubmit={onSubmit}>
          <Form.Control type="file" multiple onChange={onFileSelect} accept="image/jpeg,image/png,video/mp4,video/quicktime" />
          <div className="vr" />
          <Button variant="primary" type="submit">
            {t('photo.page.album-upload.upload')}
          </Button>
        </Form>
        <PhotoUploadList />
      </CommonContainer>
    </div>
  )
}
