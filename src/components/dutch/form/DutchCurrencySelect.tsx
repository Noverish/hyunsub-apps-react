import Form from 'react-bootstrap/Form';

import { DutchCurrency, dutchCurrencyList } from 'src/model/dutch';

interface Props {
  value?: DutchCurrency;
  onChange: (v: DutchCurrency) => void;
  isInvalid?: boolean;
}

export default function DutchCurrencySelect(props: Props) {
  const options = dutchCurrencyList.map((v) => (
    <option key={v} value={v}>
      {v}
    </option>
  ));

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as DutchCurrency;
    props.onChange(value);
  };

  return (
    <Form.Select onChange={onChange} isInvalid={props.isInvalid}>
      {options}
    </Form.Select>
  );
}
