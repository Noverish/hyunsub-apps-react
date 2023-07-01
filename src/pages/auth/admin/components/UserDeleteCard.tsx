import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import userDeleteApi, { UserDeleteParams } from 'src/api/auth/admin/user-delete';
import UserSelect from 'src/components/auth/UserSelect';
import ApiResult from 'src/components/common/ApiResult';
import { AdminUser } from 'src/model/auth';

type FormState = UserDeleteParams;

export default function UserDeleteCard() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormState>();
  const [result, setResult] = useState<any>();

  const onUserSelect = (user?: AdminUser) => {
    setValue('idNo', user?.idNo ?? '', { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    userDeleteApi(state).then((v) => setResult(v));
  };

  register('idNo', { required: 'User is not selected' });

  return (
    <Card className="UserDeleteCard">
      <Card.Header>User Delete</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
          <Form.Group>
            <Form.Label>User</Form.Label>
            <UserSelect onSelect={onUserSelect} isInvalid={!!errors.idNo?.message} />
            <Form.Control.Feedback type="invalid">{errors.idNo?.message}</Form.Control.Feedback>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Delete
            </Button>
          </div>

          {result && <ApiResult result={result} />}
        </Form>
      </Card.Body>
    </Card>
  );
}
