import React, { useEffect } from 'react';
import { Container, Form, Button, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {useParams, Link} from 'react-router-dom';
import albumDetailApi from 'src/api/photo/album-detail';
import PhotoHeader from 'src/components/photo/PhotoHeader';
import PhotoUploadList from 'src/components/photo/PhotoUploadList';
import { useDispatch } from 'src/redux';
import { prepareUploadAction, albumUploadAction } from './AlbumUploadContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import routes from 'src/pages/photo/PhotoRoutes';

import './AlbumUploadPage.scss';

interface FormState {
  files: FileList;
}

export default function AlbumUploadPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const albumId = parseInt(useParams().albumId!!, 10);

  const album = albumDetailApi.useApi({ albumId });

  const { register, handleSubmit } = useForm<FormState>();

  useEffect(() => {
    document.title = t('photo.page.album-upload.title', [album.name]);
  }, [t, album.name]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    dispatch(prepareUploadAction(files?.length ?? 0));
  }

  const onSubmit: SubmitHandler<FormState> = (params: FormState) => {
    if (params.files.length === 0) {
      alert(t('photo.page.album-upload.msg.empty-upload'));
      return;
    }

    dispatch(albumUploadAction(params.files, albumId));
  };

  return (
    <div id="AlbumUploadPage">
      <PhotoHeader />
      <Container id="content">
        <Link to={routes.albumDetail(albumId)} style={{ float: 'right' }}>
          <Button variant='secondary'>{t('photo.page.album-upload.back-to-album')}</Button>
        </Link>
        <h1>{album.name}</h1>
        <hr />
        <Form id="album_upload_form" onSubmit={handleSubmit(onSubmit)}>
          <Form.Control type="file" {...register('files')} className="input_dark" multiple onChange={onFileSelect} />
          <div className="vr" />
          <Button variant="primary" type="submit">
            {t('photo.page.album-upload.upload')}
          </Button>
        </Form>
        <PhotoUploadList />
      </Container>
    </div>
  )
}
