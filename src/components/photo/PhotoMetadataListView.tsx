import { Table } from "react-bootstrap";
import { PhotoMetadata } from "src/model/photo"

import './PhotoMetadataListView.scss';

interface Props {
  list: PhotoMetadata[];
}

export default function PhotoMetadataListView({ list }: Props) {
  const rows = list.map(v => (
    <tr>
      <td>{v.photoId}</td>
      <td>{v.date}</td>
      <td>{v.userId}</td>
      <td>{v.name}</td>
      <td>{v.fileDt}</td>
      <td>{v.subSecDateTimeOriginal}</td>
      <td>{v.dateTimeOriginal}</td>
      <td>{v.gpsDateTime}</td>
      <td>{v.timeStamp}</td>
      <td>{v.modifyDate}</td>
      <td>{v.creationDate}</td>
      <td>{v.offsetTime}</td>
      <td>{v.offsetTimeOriginal}</td>
      <td>{v.offsetTimeDigitized}</td>
    </tr>
  ));

  return (
    <div className="PhotoMetadataListView text-nowrap hide_scrollbar">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>photoId</th>
            <th>date</th>
            <th>userId</th>
            <th>name</th>
            <th>fileDt</th>
            <th>subSecDateTimeOriginal</th>
            <th>dateTimeOriginal</th>
            <th>gpsDateTime</th>
            <th>timeStamp</th>
            <th>modifyDate</th>
            <th>creationDate</th>
            <th>offsetTime</th>
            <th>offsetTimeOriginal</th>
            <th>offsetTimeDigitized</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
  )
}
