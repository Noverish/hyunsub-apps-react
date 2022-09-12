import { Table } from "react-bootstrap";
import { PhotoExifDate } from "src/model/photo";

import './PhotoExifDateTable.scss';

interface Props {
  list: PhotoExifDate[];
  onCellClick: (data: PhotoExifDate, date: string) => void;
}

export function renderCell(onClickCell: (date: string) => void, photoDate: string, date: string) {
  const dateObj = new Date(date);
  const photoDateObj = new Date(photoDate);

  let className = '';
  if (photoDate === date) {
    className = '';
  } else if (Math.abs(dateObj.getTime() - photoDateObj.getTime()) < 60 * 1000) {
    className = 'similar';
  } else if (dateObj.getTime() !== photoDateObj.getTime()) {
    className = "different";
  }

  const onClick = () => {
    onClickCell(date);
  };

  return (
    <td className={className} onClick={onClick}>{date}</td>
  )
}

interface PhotoExifDateTableRowProps {
  i: number;
  data: PhotoExifDate;
  onCellClick: (data: PhotoExifDate, date: string) => void;
}

export function PhotoExifDateTableRow(props: PhotoExifDateTableRowProps) {
  const { i, data, onCellClick } = props;

  const onClickCell = (date: string) => {
    onCellClick(data, date);
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{data.photoId}</td>
      <td>{data.name}</td>
      <td>{data.date}</td>
      {renderCell(onClickCell, data.date, data.nameDate)}
      {renderCell(onClickCell, data.date, data.dateTimeCreated)}
      {renderCell(onClickCell, data.date, data.subSecCreateDate)}
      {renderCell(onClickCell, data.date, data.fileModifyDate)}
      {renderCell(onClickCell, data.date, data.modifyDate)}
      {renderCell(onClickCell, data.date, data.createDate)}
      {renderCell(onClickCell, data.date, data.creationDate)}
      {renderCell(onClickCell, data.date, data.dateTimeOriginal)}
      {renderCell(onClickCell, data.date, data.timeStamp)}
      {renderCell(onClickCell, data.date, data.gpsDateTime)}
    </tr>
  )
}

export default function PhotoExifDateTable(props: Props) {
  const { list, onCellClick } = props;

  const rows = list.map((v, i) =>
    <PhotoExifDateTableRow key={v.photoId} i={i} data={v} onCellClick={onCellClick} />
  )

  return (
    <Table striped bordered hover variant="dark" id="PhotoExifDateTable">
      <thead>
        <tr>
          <th>#</th>
          <th>photoId</th>
          <th>name</th>
          <th>date</th>
          <th>nameDate</th>
          <th>dateTimeCreated</th>
          <th>subSecCreateDate</th>
          <th>fileModifyDate</th>
          <th>modifyDate</th>
          <th>createDate</th>
          <th>creationDate</th>
          <th>dateTimeOriginal</th>
          <th>timeStamp</th>
          <th>gpsDateTime</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  )
}
