import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useTokenPayload } from 'src/hooks/token';

import './MenuProfileView.scss';

interface Props {}

export default function MenuProfileView(props: Props) {
  const { t } = useTranslation();
  const { username } = useTokenPayload();

  const onClick = () => {
    window.location.href = 'https://auth.hyunsub.kim/my';
  };

  return (
    <div className="MenuProfileView">
      <img alt="https://picsum.photos/500" className="profile" src="https://picsum.photos/500" />
      <span className="username">{username}</span>
      <Button variant="secondary" size="sm" onClick={onClick}>
        {t('menu.profile')}
      </Button>
    </div>
  );
}
