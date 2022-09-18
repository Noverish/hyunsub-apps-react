import { Table } from "react-bootstrap";
import { PhotoDate } from "src/model/photo";

import './PhotoDateTable.scss';

interface Props {
  list: PhotoDate[];
  onCellClick: (data: PhotoDate, date: string) => void;
}

export function renderCell(onClickCell: (date: string) => void, photoDate: string, date: string | null) {
  if (!date) {
    return (
      <td></td>
    )
  }

  const dateObj = new Date(date);
  const photoDateObj = new Date(photoDate);
  const diff = Math.abs(dateObj.getTime() - photoDateObj.getTime());

  let className = '';
  if (diff <= 3000) {
    className = '';
  } else if (diff <= 60 * 1000) {
    className = 'similar';
  } else {
    className = "different";
  }

  const onClick = () => {
    onClickCell(date);
  };

  return (
    <td className={className} onClick={onClick}>
      {date.split(' ')[0]}
      <br />
      {date.split(' ')[1]}
    </td>
  )
}

interface PhotoDateTableRowProps {
  i: number;
  data: PhotoDate;
  onCellClick: (data: PhotoDate, date: string) => void;
}

export function PhotoDateTableRow(props: PhotoDateTableRowProps) {
  const { i, data, onCellClick } = props;

  const onClickCell = (date: string) => {
    onCellClick(data, date);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{data.photoId}</td>
      <td>{data.name}</td>
      <td>
        {data.date.split(' ')[0]}
        <br />
        {data.date.split(' ')[1]}
      </td>
      {renderCell(onClickCell, data.date, data.nameDate)}
      {renderCell(onClickCell, data.date, data.subSecCreateDate)}
      {renderCell(onClickCell, data.date, data.modifyDate)}
      {renderCell(onClickCell, data.date, data.createDate)}
      {renderCell(onClickCell, data.date, data.dateTimeOriginal)}
      {renderCell(onClickCell, data.date, data.dateTimeCreated)}
      {renderCell(onClickCell, data.date, data.timeStamp)}
      {renderCell(onClickCell, data.date, data.creationDate)}
      {renderCell(onClickCell, data.date, data.fileModifyDate)}
      {renderCell(onClickCell, data.date, data.gpsDateTime)}
    </tr>
  )
}

export default function PhotoDateTable(props: Props) {
  const { list, onCellClick } = props;

  const rows = list.map((v, i) =>
    <PhotoDateTableRow key={v.photoId} i={i} data={v} onCellClick={onCellClick} />
  )

  return (
    <Table striped bordered hover variant="dark" id="PhotoDateTable">
      <thead>
        <tr>
          <th>#</th>
          <th>photoId</th>
          <th>name</th>
          <th>date</th>
          <th>nameDate</th>
          <th>subSecCreateDate</th>
          <th>modifyDate</th>
          <th>createDate</th>
          <th>dateTimeOriginal</th>
          <th>dateTimeCreated</th>
          <th>timeStamp</th>
          <th>creationDate</th>
          <th>fileModifyDate</th>
          <th>gpsDateTime</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  )
}
