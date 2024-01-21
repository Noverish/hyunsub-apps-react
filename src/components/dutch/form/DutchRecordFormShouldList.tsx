import { t } from 'i18next';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useFieldArray, useFormContext } from 'react-hook-form';

import DutchMemberSelectModal from './DutchMemberSelectModal';
import { DutchRecordFormContext } from './DutchRecordFormContext';
import DutchRecordFormHooks from './DutchRecordFormHooks';
import { DutchRecordFormState } from 'src/components/dutch/form/DutchRecordForm';
import DutchRecordFormMember from 'src/components/dutch/form/DutchRecordFormShouldItem';
import { DutchContext } from 'src/context/dutch/DutchContext';

export default function DutchRecordFormMemberList() {
  const { members } = useContext(DutchContext);
  const [{ showShouldModal: show }, setState] = useContext(DutchRecordFormContext);
  const { control } = useFormContext<DutchRecordFormState>();
  const { fields, remove, append } = useFieldArray<DutchRecordFormState, 'shoulds', 'memberId'>({
    control,
    name: 'shoulds',
  });

  const shouldAddCallback = DutchRecordFormHooks.useShouldAddCallback();

  const onMemberSelect = (memberIds: string[]) => {
    memberIds.forEach((memberId) => {
      append({
        memberId,
        amount: 0,
      });
    });

    shouldAddCallback();
    setState({ showShouldModal: false });
  };

  const showModal = () => {
    setState({ showShouldModal: true });
  };

  const cnt = fields.length;
  const alreadySelectedMemberIds = fields.map((v) => v.memberId);
  const showAddBtn = members.length !== fields.length;

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

  return (
    <div className="DutchRecordFormMemberList">
      {cnt > 0 ? table : undefined}
      {showAddBtn && (
        <>
          <Button onClick={showModal}>{t('add')}</Button>
          <DutchMemberSelectModal
            show={show}
            onSelect={onMemberSelect}
            alreadySelectedMemberIds={alreadySelectedMemberIds}
            defaultAllSelect
          />
        </>
      )}
    </div>
  );
}
