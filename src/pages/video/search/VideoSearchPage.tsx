import { Form } from "react-bootstrap";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import CommonContainer from 'src/components/common/header/CommonContainer';
import VideoHeader from "src/components/video/VideoHeader";
import VideoRoutes from 'src/pages/video/VideoRoutes';

interface FormState {
  query: string;
}

export default function VideoSearchPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    navigate(VideoRoutes.searchResultRoute(state.query));
  };

  return (
    <div id="VideoSearchPage">
      <VideoHeader title={t('search')} />
      <CommonContainer>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Control {...register('query')} placeholder={t('msg.type-query') as string} />
          </Form.Group>
        </Form>

      </CommonContainer>
    </div>
  )
}
