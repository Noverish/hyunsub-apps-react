import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FieldArrayWithId, UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchRecordParams } from 'src/model/dutch';

interface Props {
  index: number;
  field: FieldArrayWithId<DutchRecordParams, 'members', 'memberId'>;
  remove: UseFieldArrayRemove;
}

export default function DutchRecordFormMemberItem({ index, field, remove }: Props) {
  const { members } = useContext(DutchContext);
  const { register } = useFormContext<DutchRecordParams>();
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
