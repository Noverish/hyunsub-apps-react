import { t } from 'i18next';
import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useFieldArray, useFormContext } from 'react-hook-form';

import DutchMemberDropdown from 'src/components/dutch/form/DutchMemberDropdown';
import DutchRecordFormMember from 'src/components/dutch/form/DutchRecordFormMemberItem';
import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchMember, DutchRecordParams } from 'src/model/dutch';

interface Props {}

export default function DutchRecordFormMemberList(props: Props) {
  const { members } = useContext(DutchContext);
  const { control } = useFormContext<DutchRecordParams>();
  const { fields, remove, append } = useFieldArray<DutchRecordParams, 'members', 'memberId'>({
    control,
    name: 'members',
  });

  const onMemberSelect = (member: DutchMember) => {
    append({
      memberId: member.id,
      actual: 0,
      should: 0,
    });
  };

  const cnt = fields.length;
  const alreadySelectedMemberIds = fields.map((v) => v.memberId);
  const hideDropdown = members.length === fields.length;

  const table = (
    <table>
      <colgroup>
        <col className="name" />
        <col className="should" />
        <col className="actual" />
      </colgroup>
      <thead>
        <tr>
          <td>{t('DutchRecordMember.name')}</td>
          <td>{t('DutchRecordMember.should')}</td>
          <td>{t('DutchRecordMember.actual')}</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, i) => (
          <DutchRecordFormMember key={field.memberId} index={i} field={field} remove={remove} />
        ))}
      </tbody>
    </table>
  );

  const dropdown = (
    <DutchMemberDropdown onSelect={onMemberSelect} alreadySelectedMemberIds={alreadySelectedMemberIds} />
  );

  return (
    <div className="DutchRecordFormMemberList">
      <Form.Label>{t('DutchRecord.members')}</Form.Label>
      {cnt > 0 ? table : undefined}
      {hideDropdown ? undefined : dropdown}
    </div>
  );
}
