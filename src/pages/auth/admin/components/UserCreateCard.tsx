import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import userCreateApi, { UserCreateParams } from 'src/api/auth/admin/user-create';
import ApiResult from 'src/components/common/ApiResult';

type FormState = UserCreateParams;

export default function UserCreateCard() {
  const { register, handleSubmit } = useForm<FormState>();
  const [result, setResult] = useState<any>();

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    userCreateApi(state).then((v) => setResult(v));
  };

  return (
    <Card className="UserCreateCard">
      <Card.Header>User Create</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control {...register('name', { required: true })} />
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </div>

          {result && <ApiResult result={result} />}
        </Form>
      </Card.Body>
    </Card>
  );
}
