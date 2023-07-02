import CustomMultiSelect, { CustomMultiSelectProps } from '../common/select/CustomMultiSelect';
import authorityListApi from 'src/api/auth/admin/authority-list';
import { AdminAuthority } from 'src/model/auth';

type Props = Omit<CustomMultiSelectProps<AdminAuthority>, 'data' | 'labelSelector'>;

export default function UserAuthoritySelect(props: Props) {
  const authorities = authorityListApi.useApi({});

  return <CustomMultiSelect data={authorities} labelSelector={(v) => v.name} {...props} />;
}
