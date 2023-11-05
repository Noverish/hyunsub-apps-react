import cs from 'classnames';
import { t } from 'i18next';
import { useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useBreakpointMobile } from 'src/utils/breakpoint';

interface Props {
  className?: string;
  defaultQuery: string;
  onSubmit: (query: string) => void;
}

interface FormState {
  query: string;
}

export default function SearchInput(props: Props) {
  const isMobile = useBreakpointMobile();

  const { register, handleSubmit, setValue } = useForm<FormState>({
    defaultValues: { query: props.defaultQuery },
  });

  useEffect(() => {
    setValue('query', props.defaultQuery);
  }, [setValue, props.defaultQuery]);

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    props.onSubmit(state.query);
  };

  return (
    <Form className={cs('SearchInput', props.className)} onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Form.Control {...register('query')} placeholder={t('msg.type-query') as string} />
        <Button variant="primary border" type="submit">
          {isMobile ? <i className="fas fa-search" /> : t('search')}
        </Button>
      </InputGroup>
    </Form>
  );
}
