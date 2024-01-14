import { DutchRecordMember } from 'src/model/dutch';
import { numberWithComma } from 'src/utils';

interface Props {
  member: DutchRecordMember;
}

export default function DutchRecordMemberItem({ member }: Props) {
  return (
    <tr className="DutchRecordMemberItem hyunsub_border">
      <td>{member.name}</td>
      <td>{numberWithComma(member.should)}</td>
      <td>{numberWithComma(member.actual)}</td>
    </tr>
  );
}
