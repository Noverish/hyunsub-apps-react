import CustomSelect from '../common/select/CustomSelect';
import userListApi from 'src/api/auth/admin/user-list';
import { CustomSelectProps } from 'src/components/common/select/CustomSelect';
import { AdminUser } from 'src/model/auth';

type Props = Omit<CustomSelectProps<AdminUser>, 'data' | 'labelSelector'>;

export default function UserSelect(props: Props) {
  const users = userListApi.useApi({});

  return <CustomSelect data={users} labelSelector={(v) => v.username} {...props} />;
}
