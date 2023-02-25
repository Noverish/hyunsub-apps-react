import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { Button, Form, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from 'react-hook-form';
import videoSearchApi, { VideoSearchParams } from "src/api/video/video-search";
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { Loading } from "src/components/common/LoadingSuspense";
import { useBreakpointMobile } from "src/utils/breakpoint";
import { setDocumentTitle } from "src/utils/services";
import VideoSearchResultView from "./components/VideoSearchResultView";

export default function VideoSearchPage() {
  const isMobile = useBreakpointMobile();

  setDocumentTitle(t('VideoSearchPage.title'));

  const { register, handleSubmit, getValues } = useForm<VideoSearchParams>();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: (params: VideoSearchParams) => videoSearchApi.api(params),
  })

  const onSubmit: SubmitHandler<VideoSearchParams> = (state: VideoSearchParams) => {
    mutate(state);
  };

  return (
    <div id="VideoSearchPage">
      <MobileHeader title={t('VideoSearchPage.title')} />
      <CommonContainer>

        {isMobile || <h2 className="mb-3">{t('VideoSearchPage.title')}</h2>}

        <Form onSubmit={handleSubmit(onSubmit)} className="mb-3">
          <InputGroup>
            <Form.Control {...register('query')} placeholder={t('msg.type-query') as string} />
            <Button variant="primary border" type="submit">
              {isMobile ? <i className="fas fa-search" /> : t('search')}
            </Button>
          </InputGroup>
        </Form>

        {isLoading && <Loading />}

        {data && <VideoSearchResultView result={data} query={getValues('query')} />}

      </CommonContainer>
    </div>
  )
}
