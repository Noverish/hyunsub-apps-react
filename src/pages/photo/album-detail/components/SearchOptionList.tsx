import { useContext } from 'react';

import { AlbumDetailContext } from '../AlbumDetailContext';
import SearchOptionItem from './SearchOptionItem';
import { AlbumMember } from 'src/model/photo';

interface Props {
  members: AlbumMember[];
}

export default function SearchOptionList(props: Props) {
  const { members } = props;

  const [state] = useContext(AlbumDetailContext);
  const photoSearchParams = state.photoSearchParams;
  const userIds = photoSearchParams.userIds ?? [];

  const elements: JSX.Element[] = [];

  if (userIds.length > 0) {
    const memberNames = userIds.map((v) => members.filter((v2) => v2.userId === v)[0].name).join(', ');

    const text = `멤버: ${memberNames}`;
    const element = <SearchOptionItem text={text} key={text} />;
    elements.push(element);
  }

  if (elements.length === 0) {
    return <></>;
  }

  return <div className="SearchOptionList">{elements}</div>;
}
