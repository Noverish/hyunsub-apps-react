import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { videoEntryRenameAction } from '../EntryManageActions';
import { EntryRenameParams } from 'src/api/video/entry-manage/entry-rename';
import { useUrlParams } from 'src/hooks/url-params';
import { dispatch } from 'src/redux';

import './EntryRenameCard.scss';

type FormState = EntryRenameParams;

export default function EntryRenameCard() {
  const [entryId] = useUrlParams('entryId');

  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    dispatch(videoEntryRenameAction(entryId, state));
  };

  return (
    <Card className="EntryRenameCard">
      <Card.Header>Video Rename Bulk</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <span>이름 일괄 변경</span>

          <div>
            <InputGroup className="from">
              <Form.Control {...register('from')} />
              <InputGroup.Text>
                <i className="fas fa-arrow-right"></i>
              </InputGroup.Text>
              <Form.Control {...register('to')} />
            </InputGroup>
          </div>

          <Button type="submit">일괄 변경</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
