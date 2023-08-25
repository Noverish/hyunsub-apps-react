import { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  initialValue: Date;
  onChange: (date: Date) => void;
}

export default function CommonCalendar(props: Props) {
  const [value, setValue] = useState<Value>(props.initialValue);

  const onChange = (v: Value) => {
    setValue(v);
    if (isDate(v)) {
      props.onChange(v);
    }
  };

  return (
    <Calendar className="CommonCalendar" onChange={onChange} value={value} calendarType="gregory" locale="en-US" />
  );
}

function isDate(value: Value): value is Date {
  if (value !== null) {
    return (value as any).getTime !== undefined;
  }
  return false;
}
