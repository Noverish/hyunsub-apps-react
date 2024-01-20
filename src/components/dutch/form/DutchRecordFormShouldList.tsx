import { t } from 'i18next';
import { useContext } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import DutchRecordFormHooks from './DutchRecordFormHooks';
import DutchMemberAddDropdown from 'src/components/dutch/form/DutchMemberAddDropdown';
import { DutchRecordFormState } from 'src/components/dutch/form/DutchRecordForm';
import DutchRecordFormMember from 'src/components/dutch/form/DutchRecordFormShouldItem';
import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchMember } from 'src/model/dutch';

export default function DutchRecordFormMemberList() {
  const { members } = useContext(DutchContext);
  const { control } = useFormContext<DutchRecordFormState>();
  const { fields, remove, append } = useFieldArray<DutchRecordFormState, 'shoulds', 'memberId'>({
    control,
    name: 'shoulds',
  });

  const shouldAddCallback = DutchRecordFormHooks.useShouldAddCallback();

  const onMemberSelect = (member: DutchMember) => {
    append({
      memberId: member.id,
      amount: 0,
    });
    shouldAddCallback();
  };

  const cnt = fields.length;
  const alreadySelectedMemberIds = fields.map((v) => v.memberId);
  const hideDropdown = members.length === fields.length;

  const table = (
    <table className="w-100">
      <colgroup>
        <col className="name" />
        <col className="amount" />
      </colgroup>
      <thead>
        <tr>
          <td>{t('DutchRecordMember.name')}</td>
          <td>{t('Dutch.amount')}</td>
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
    <DutchMemberAddDropdown onSelect={onMemberSelect} alreadySelectedMemberIds={alreadySelectedMemberIds} />
  );

  return (
    <div className="DutchRecordFormMemberList">
      {cnt > 0 ? table : undefined}
      {hideDropdown ? undefined : dropdown}
    </div>
  );
}
