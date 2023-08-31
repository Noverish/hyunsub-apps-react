import cs from 'classnames';
import { useState } from 'react';
import Calendar, { CalendarProps, TileClassNameFunc } from 'react-calendar';
import { OnArgs, TileArgs } from 'react-calendar/dist/cjs/shared/types';

import './CommonCalendar.scss';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props extends Omit<CalendarProps, 'onChange' | 'value' | 'tileClassName'> {
  initialValue: Date;
  onDateChange: (date: Date) => void;
  tileClassName?: (args: TileArgs) => string;
}

export default function CommonCalendar({ initialValue, onDateChange, tileClassName, ...etc }: Props) {
  const [value, setValue] = useState<Value>(initialValue);

  const onChange = (v: Value) => {
    setValue(v);
    if (isDate(v)) {
      onDateChange(v);
    }
  };

  const tileClassName2: TileClassNameFunc = (args) => {
    const { date, view, activeStartDate } = args;
    const value = tileClassName?.(args);
    const list: string[] = [];

    const activeMonth = activeStartDate.getMonth();
    const nowMonth = date.getMonth();
    if (view === 'month' && nowMonth === activeMonth && date.getDay() === 6) {
      list.push('sat');
    }

    return cs(list, value);
  };

  const onActiveStartDateChange = ({ activeStartDate, view }: OnArgs) => {
    if (view === 'month' && activeStartDate) {
      onChange(activeStartDate);
    }
  };

  return (
    <Calendar
      className="CommonCalendar"
      onChange={onChange}
      value={value}
      calendarType="gregory"
      locale="en-US"
      tileClassName={tileClassName2}
      onActiveStartDateChange={onActiveStartDateChange}
      {...etc}
    />
  );
}

function isDate(value: Value): value is Date {
  if (value !== null) {
    return (value as any).getTime !== undefined;
  }
  return false;
}
