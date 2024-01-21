import { useContext } from 'react';
import Form from 'react-bootstrap/Form';

import { DutchContext } from 'src/context/dutch/DutchContext';

interface Props {
  value?: string;
  onChange: (memberId: string) => void;
  isInvalid?: boolean;
}

export default function DutchMemberSelect(props: Props) {
  const { value, isInvalid } = props;
  const { members } = useContext(DutchContext);

  const options = members.map((v) => (
    <option key={v.id} value={v.id}>
      {v.name}
    </option>
  ));

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const memberId = e.currentTarget.value as string;
    props.onChange(memberId);
  };

  return (
    <Form.Select onChange={onChange} isInvalid={isInvalid} value={value}>
      {options}
    </Form.Select>
  );
}
