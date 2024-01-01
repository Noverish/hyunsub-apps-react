import { DutchRecordMember } from 'src/model/dutch';

interface Props {
  member: DutchRecordMember;
}

export default function DutchRecordMemberItem({ member }: Props) {
  return (
    <tr className="DutchRecordMemberItem hyunsub_border">
      <td>{member.name}</td>
      <td>{member.should}</td>
      <td>{member.actual}</td>
    </tr>
  );
}
