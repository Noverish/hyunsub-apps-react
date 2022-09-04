import { AdminAuthority, AdminUser } from 'src/model/auth';
import { ListGroup, Button } from 'react-bootstrap';
import Select, { StylesConfig, MultiValue, ActionMeta } from 'react-select';
import { useDispatch } from 'src/redux';
import { delUserAuthorityAction, putUserAuthorityAction } from 'src/pages/auth/admin/AuthAdminContext';
import { adminSignOutAction } from '../../pages/auth/admin/AuthAdminContext';

interface Props {
  user: AdminUser;
  authorities: AdminAuthority[];
}

const styleConfig: StylesConfig<AdminAuthority, true> = {
  input: (styles) => ({
    ...styles,
    color: 'white',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'black',
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused ? '#333' : undefined,
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'black',
  }),
};

const getOptionLabel = (option: AdminAuthority) => option.name;
const getOptionValue = (option: AdminAuthority) => option.id.toString();

export default function AdminUserListItem(props: Props) {
  const { user, authorities } = props;
  const dispatch = useDispatch();

  const userAuthorities = authorities.filter(v => user.authorities.includes(v.id));

  const onChange = (newValue: MultiValue<AdminAuthority>, actionMeta: ActionMeta<AdminAuthority>) => {
    const action = actionMeta.action
    if (action === 'select-option') {
      const option = actionMeta.option!!;
      dispatch(putUserAuthorityAction({ idNo: user.idNo, authorityId: option.id }));
    } else if (action === 'remove-value') {
      const option = actionMeta.removedValue;
      dispatch(delUserAuthorityAction({ idNo: user.idNo, authorityId: option.id }));
    }
  };

  const onSignOut = () => {
    dispatch(adminSignOutAction(user.idNo));
  }

  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-between align-items-center">
        <div className="fs-4">[{user.idNo}] {user.username}</div>
        <Button variant="danger" size="sm" onClick={onSignOut}>회원 탈퇴</Button>
      </div>
      <Select
        className="mt-2"
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        options={authorities}
        styles={styleConfig}
        defaultValue={userAuthorities}
        isMulti
        onChange={onChange}
      />
    </ListGroup.Item>
  )
}
