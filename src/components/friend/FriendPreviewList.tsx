import { t } from 'i18next';
import { useEffect, useRef } from 'react';

import { Loading } from '../common/LoadingSuspense';
import FriendPreviewItem from './FriendPreviewItem';
import CommonPagination from 'src/components/common/CommonPagination';
import { PageData } from 'src/model/api';
import { FriendPreview } from 'src/model/friend';

interface Props {
  data?: PageData<FriendPreview>;
  page: number;
  setPage: (page: number) => void;
}

export default function FriendPreviewList({ data, page, setPage }: Props) {
  const previous = useRef<PageData<FriendPreview>>();

  useEffect(() => {
    if (data) {
      previous.current = data;
    }
  }, [data]);

  const pageData = data ?? previous.current;

  if (!pageData) {
    return <Loading />;
  }

  const { total, pageSize } = pageData;

  const elements = pageData.data.map((v) => <FriendPreviewItem key={v.id} friend={v} />);

  const totalPage = Math.floor((total - 1) / pageSize) + 1;

  const content =
    elements.length === 0 ? (
      <span>{t('FriendPreviewList.empty-msg')}</span>
    ) : (
      <>
        <CommonPagination now={page} total={totalPage} onClick={setPage} />
        {data ? <div className="d-grid gap-3">{elements}</div> : <Loading vh={50} />}
        <CommonPagination now={page} total={totalPage} onClick={setPage} />
      </>
    );

  return <div className="FriendPreviewList d-grid gap-3">{content}</div>;
}
