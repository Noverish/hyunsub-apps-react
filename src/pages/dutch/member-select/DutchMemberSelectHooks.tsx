import { useUrlParams } from 'src/hooks/url-params';
import { DutchMember } from 'src/model/dutch';

export interface DutchMemberSelectPageParams {
  tripId: string;
}

function usePageParams(): DutchMemberSelectPageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

function useSelect() {
  const { tripId } = usePageParams();

  return (member: DutchMember) => {
    window.localStorage.setItem(tripId, member.id);
    window.location.href = `/bridge/entry/${tripId}/member?memberId=${member.id}`;
  };
}

function useMemberId() {
  const { tripId } = usePageParams();

  return window.localStorage.getItem(tripId);
}

const DutchMemberSelectHooks = {
  usePageParams,
  useSelect,
  useMemberId,
};

export default DutchMemberSelectHooks;
