import { t } from 'i18next';
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import diarySearchApi from 'src/api/diary/diary-search';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DiaryPreviewView from 'src/components/diary/DiaryPreviewView';
import { useBreakpointMobile } from 'src/utils/breakpoint';

interface Props {}

interface FormState {
  query: string;
}

export default function DiaryHomePage(props: Props) {
  const isMobile = useBreakpointMobile();

  const [query, setQuery] = useState('');

  const { register, handleSubmit } = useForm<FormState>();

  const { infiniteData } = diarySearchApi.useInfiniteApi({ query });

  const elements = infiniteData.map((v) => <DiaryPreviewView key={v.date} diary={v} />);

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    setQuery(state.query);
  };

  return (
    <div className="DiaryHomePage">
      <MobileHeader title="Diary" />
      <CommonContainer>
        <Form onSubmit={handleSubmit(onSubmit)} className="mb-3">
          <InputGroup>
            <Form.Control {...register('query')} placeholder={t('msg.type-query') as string} />
            <Button variant="primary border" type="submit">
              {isMobile ? <i className="fas fa-search" /> : t('search')}
            </Button>
          </InputGroup>
        </Form>

        <div className="d-grid gap-3">{elements}</div>
      </CommonContainer>
    </div>
  );
}
