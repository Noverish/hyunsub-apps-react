import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { DutchRecordFormState, DutchRecordShare } from './DutchRecordForm';
import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchRecordDetail, DutchRecordMemberParams, DutchRecordParams } from 'src/model/dutch';
import { toDateTimeString } from 'src/utils/date';

function useDefaultValues(record?: DutchRecordDetail): Partial<DutchRecordFormState> {
  const defaultCurrency = useContext(DutchContext).trip?.tripCurrency;

  if (!record) {
    return {
      currency: defaultCurrency,
      payment: 'CASH',
      date: toDateTimeString(new Date()),
    };
  }

  const actuals: DutchRecordShare[] = record.members
    .filter((v) => v.actual > 0)
    .map((v) => ({ memberId: v.memberId, amount: v.actual }));

  const shoulds: DutchRecordShare[] = record.members
    .filter((v) => v.should > 0)
    .map((v) => ({ memberId: v.memberId, amount: v.should }));

  return {
    content: record.record.content,
    location: record.record.location,
    currency: record.record.currency,
    payment: record.record.payment,
    date: record.record.date,
    actuals,
    shoulds,
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
    payment: state.payment,
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
  useDefaultValues,
  convertToRecordParams,
  useShouldAddCallback,
};

export default DutchRecordFormHooks;
