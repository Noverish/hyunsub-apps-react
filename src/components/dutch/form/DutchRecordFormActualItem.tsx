import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import { DutchRecordShare } from './DutchRecordForm';
import { DutchRecordFormState } from 'src/components/dutch/form/DutchRecordForm';
import { DutchContext } from 'src/context/dutch/DutchContext';

interface Props {
  index: number;
  field: DutchRecordShare;
  remove: UseFieldArrayRemove;
}

export default function DutchRecordFormMemberItem({ index, field, remove }: Props) {
  const { members } = useContext(DutchContext);
  const { register, formState } = useFormContext<DutchRecordFormState>();
  const { errors } = formState;
  const member = members.filter((v) => v.id === field.memberId)[0];

  const onRemove = () => {
    remove(index);
  };

  const controlProps = register(`actuals.${index}.amount`, {
    valueAsNumber: true,
    min: { value: 0, message: t('common.form.feedback.no-minus') },
  });

  const amountError = errors.actuals?.[index]?.amount;

  return (
    <tr className="DutchRecordFormMemberItem">
      <td className="member_name">{member.name}</td>
      <td>
        <Form.Control type="number" step="0.01" {...controlProps} isInvalid={!!amountError} />
        <Form.Control.Feedback type="invalid">{amountError?.message}</Form.Control.Feedback>
      </td>
      <td>
        <Button variant="danger" onClick={onRemove}>
          <i className="fas fa-trash" />
        </Button>
      </td>
    </tr>
  );
}
