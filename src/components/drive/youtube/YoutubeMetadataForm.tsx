import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useYoutubeDownload } from 'src/components/drive/youtube/YoutubeDownloadHooks';
import { YoutubeMetadata } from 'src/model/drive';

import './YoutubeMetadataForm.scss';

interface FormState {
  resolution: string;
  subtitles: string[];
}

interface Props {
  metadata: YoutubeMetadata;
}

export default function YoutubeMetadataForm({ metadata }: Props) {
  const { resolutions, subtitles } = metadata;

  const youtubeDownload = useYoutubeDownload();
  const { register, handleSubmit } = useForm<FormState>({
    defaultValues: {
      resolution: resolutions[resolutions.length - 1],
      subtitles: subtitles.map((v) => v.lang),
    },
  });

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    youtubeDownload(state.resolution, state.subtitles);
  };

  const resolutionRadios = resolutions.map((v, i) => (
    <Form.Check
      id={`resolution_${v}`}
      inline
      key={v}
      type="radio"
      label={v}
      value={v}
      {...register('resolution')}
    />
  ));

  const subtitleChecks = subtitles.map((v) => (
    <Form.Check
      id={`subtitle_${v.lang}`}
      inline
      key={v.lang}
      type="checkbox"
      label={v.label}
      value={v.lang}
      {...register('subtitles')}
    />
  ));

  return (
    <Form className="YoutubeMetadataForm" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>{t('drive.YoutubeMetadataForm.resolution')}</Form.Label>
        {resolutionRadios}
      </Form.Group>
      {subtitles.length > 0 && (
        <Form.Group>
          <Form.Label>{t('drive.YoutubeMetadataForm.subtitles')}</Form.Label>
          {subtitleChecks}
        </Form.Group>
      )}
      <div className="d-grid">
        <Button type="submit">{t('download')}</Button>
      </div>
    </Form>
  );
}
