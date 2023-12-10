import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import PhotoDetailHooks from '../PhotoDetailHooks';
import { PhotoDateUpdateParams } from 'src/api/photo/photo-date-update';
import { Photo } from 'src/model/photo';

import './PhotoDateForm.scss';

interface Props {
  photo: Photo;
}

export default function PhotoDateForm({ photo }: Props) {
  const update = PhotoDetailHooks.usePhotoDateUpdate();

  const { register, handleSubmit } = useForm<PhotoDateUpdateParams>({
    defaultValues: { photoId: photo.id, date: photo.date },
  });

  return (
    <Form className="PhotoDateForm" onSubmit={handleSubmit(update)}>
      <Form.Group>
        <Form.Label>{t('PhotoInfoSection.date')}</Form.Label>
        <Form.Control {...register('date')} />
      </Form.Group>
      <div>
        <Button type="submit">{t('edit')}</Button>
      </div>
    </Form>
  );
}
