import { useState } from 'react';
import { Form, Table } from 'react-bootstrap';

import { YoutubeFormat } from 'src/model/drive';
import { getHumanReadableSize } from 'src/utils';

import './YoutubeFormatTable.scss';

interface Props {
  formats: YoutubeFormat[];
}

export default function YoutubeFormatTable(props: Props) {
  const [state, setState] = useState<string[]>([]);

  const rows = props.formats.map((v, i) => {
    const formatId = v.format_id;

    const checked = state.includes(formatId);

    const onClick = () => {
      if (checked) {
        setState(state.filter(v => v !== formatId));
      } else {
        setState([...state, formatId]);
      }
    }

    const vbr = v.vbr ? `${v.vbr} kbps` : undefined;
    const abr = v.abr ? `${v.abr} kbps` : undefined;

    return (
      <tr key={formatId} onClick={onClick}>
        <td>
          <Form.Check checked={checked} readOnly />
        </td>
        <td>{v.format_note}</td>
        <td>{v.ext}</td>
        <td>{v.fps}</td>
        <td>{v.resolution}</td>
        <td>{v.filesize ? getHumanReadableSize(v.filesize) : undefined}</td>
        <td>{vbr}</td>
        <td>{abr}</td>
      </tr>
    );
  });

  return (
    <Table className="YoutubeFormatTable" striped bordered hover variant="dark">
      <thead>
        <tr>
          <th></th>
          <th>format_note</th>
          <th>ext</th>
          <th>fps</th>
          <th>resolution</th>
          <th>filesize</th>
          <th>vbr</th>
          <th>abr</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
