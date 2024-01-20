import { useFormContext } from 'react-hook-form';

import { DutchRecordFormState } from './DutchRecordForm';
import { DutchRecordDetail, DutchRecordMemberParams, DutchRecordParams } from 'src/model/dutch';
import { toDateTimeString } from 'src/utils/date';

function generateDefaultValues(record?: DutchRecordDetail): Partial<DutchRecordParams> {
  if (!record) {
    return {
      date: toDateTimeString(new Date()),
    };
  }

  return {
    content: record.record.content,
    location: record.record.location,
    currency: record.record.currency,
    date: record.record.date,
    members: record.members.map((v) => ({
      memberId: v.memberId,
      actual: v.actual,
      should: v.should,
    })),
  };
}

function convertToRecordParams(state: DutchRecordFormState): DutchRecordParams {
  const memberMap: Record<string, DutchRecordMemberParams> = {};

  state.actuals
    .filter((v) => v.amount > 0)
    .forEach(({ memberId, amount }) => {
      const member = memberMap[memberId] ?? { memberId, should: 0, actual: 0 };
      member.actual = amount;
      memberMap[memberId] = member;
    });

  state.shoulds
    .filter((v) => v.amount > 0)
    .forEach(({ memberId, amount }) => {
      const member = memberMap[memberId] ?? { memberId, should: 0, actual: 0 };
      member.should = amount;
      memberMap[memberId] = member;
    });

  return {
    content: state.content,
    location: state.location,
    currency: state.currency,
    date: state.date,
    members: Object.values(memberMap),
  };
}

function useShouldAddCallback() {
  const { getValues, setValue } = useFormContext<DutchRecordFormState>();

  return () => {
    const shouldCnt = getValues('shoulds').length;
    const actualSum = getValues('actuals').reduce((acc, v) => acc + v.amount, 0) * 100;
    const value = Math.floor(actualSum / shouldCnt);
    const remainder = actualSum - value * shouldCnt;

    for (let i = 0; i < shouldCnt; i++) {
      if (i === shouldCnt - 1) {
        setValue(`shoulds.${i}.amount`, (value + remainder) / 100);
      } else {
        setValue(`shoulds.${i}.amount`, value / 100);
      }
    }
  };
}

const DutchRecordFormHooks = {
  generateDefaultValues,
  convertToRecordParams,
  useShouldAddCallback,
};

export default DutchRecordFormHooks;
