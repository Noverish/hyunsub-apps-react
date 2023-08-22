import { t } from 'i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useBreakpointMobile } from 'src/utils/breakpoint';

interface Props {
  query: string;
  onSearch: (query: string) => void;
}

interface FormState {
  query: string;
}

export default function DiarySearchInput({ onSearch, query }: Props) {
  const isMobile = useBreakpointMobile();
  const { register, handleSubmit } = useForm<FormState>({ defaultValues: { query } });

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    onSearch(state.query);
  };

  return (
    <Form className="DiarySearchInput mb-3" onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Form.Control {...register('query')} placeholder={t('msg.type-query') as string} />
        <Button variant="primary border" type="submit">
          {isMobile ? <i className="fas fa-search" /> : t('search')}
        </Button>
      </InputGroup>
    </Form>
  );
}
