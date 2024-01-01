import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FieldArrayWithId, UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import { DutchRecordCreateParams } from 'src/api/dutch/dutch-record-create';
import { DutchContext } from 'src/context/dutch/DutchContext';

interface Props {
  index: number;
  field: FieldArrayWithId<DutchRecordCreateParams, 'members', 'memberId'>;
  remove: UseFieldArrayRemove;
}

export default function DutchRecordFormMemberItem({ index, field, remove }: Props) {
  const { members } = useContext(DutchContext);
  const { register } = useFormContext<DutchRecordCreateParams>();
  const member = members.filter((v) => v.id === field.memberId)[0];

  const onRemove = () => {
    remove(index);
  };

  return (
    <tr className="DutchRecordFormMemberItem">
      <td className="member_name">{member.name}</td>
      <td>
        <Form.Control type="text" {...register(`members.${index}.should`)} />
      </td>
      <td>
        <Form.Control type="text" {...register(`members.${index}.actual`)} />
      </td>
      <td>
        <Button variant="danger" onClick={onRemove}>
          <i className="fas fa-trash" />
        </Button>
      </td>
    </tr>
  );
}
