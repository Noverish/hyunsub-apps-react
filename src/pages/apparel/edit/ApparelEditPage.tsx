import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
import apparelDetail from 'src/api/apparel/apparel-detail';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import { Container } from 'react-bootstrap';
import ApparelForm from 'src/components/apparel/ApparelForm';

export default function ApparelEditPage() {
  const apparelId = useParams().apparelId!!;
  const { t } = useTranslation();

  const apparel = apparelDetail.useApi({ apparelId });

  useEffect(() => {
    document.title = t('apparel.page.edit.title', [apparel.name]);
  }, [t]);

  return (
    <div id="ApparelEditPage">
      <ApparelHeader />
      <Container id="content">
        <h1 className="mb-3">{t('apparel.page.edit.title', [apparel.name])}</h1>
        <ApparelForm apparel={apparel} />
      </Container>
    </div>
  )
}
