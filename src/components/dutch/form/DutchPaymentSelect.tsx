import Form from 'react-bootstrap/Form';

import { DutchPayment, dutchPaymentList, dutchPaymentStr } from 'src/model/dutch';

interface Props {
  value: DutchPayment;
  onChange: (v: DutchPayment) => void;
  isInvalid?: boolean;
}

export default function DutchPaymentSelect(props: Props) {
  const { value, isInvalid } = props;

  const options = dutchPaymentList.map((v) => (
    <option key={v} value={v}>
      {dutchPaymentStr(v)}
    </option>
  ));

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value as DutchPayment;
    props.onChange(newValue);
  };

  return (
    <Form.Select onChange={onChange} isInvalid={isInvalid} value={value}>
      {options}
    </Form.Select>
  );
}
