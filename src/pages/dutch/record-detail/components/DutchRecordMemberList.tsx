import { t } from 'i18next';

import DutchRecordMemberItem from './DutchRecordMemberItem';
import { DutchRecordMember } from 'src/model/dutch';

import './DutchRecordMemberList.scss';

interface Props {
  members: DutchRecordMember[];
}

export default function DutchRecordMemberList({ members }: Props) {
  const elements = members.map((v) => <DutchRecordMemberItem key={v.recordId + v.memberId} member={v} />);

  return (
    <div className="DutchRecordMemberList">
      <table>
        <thead>
          <tr className="hyunsub_border">
            <td>{t('DutchRecordMember.name')}</td>
            <td>{t('Dutch.should')}</td>
            <td>{t('Dutch.actual')}</td>
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </div>
  );
}
