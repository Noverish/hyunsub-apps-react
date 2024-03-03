import { Badge } from 'react-bootstrap';

interface Props {
  text: string;
}

export default function SearchOptionItem(props: Props) {
  const { text } = props;

  return <Badge className="SearchOptionItem">{text}</Badge>;
}
