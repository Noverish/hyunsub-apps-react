import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ApparelForm from 'src/components/apparel/ApparelForm';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import { Apparel } from 'src/model/apparel';
import { useDispatch } from 'src/redux';
import { apparelAddAction } from './ApparelAddContext';

export default function ApparelAddPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.add.title');
  }, [t]);

  const onImageAdd = (images: File[]) => {
    alert('Not yet implemented!');
  };

  const onSubmit = (apparel: Apparel) => {
    dispatch(apparelAddAction(apparel));
  };

  return (
    <div id="ApparelAddPage">
      <ApparelHeader title={t('add')} />
      <Container id="content" className="with_tab_bar">
        <h1 className="mb-3">{t('apparel.page.add.title')}</h1>
        <ApparelForm
          onImageAdd={onImageAdd}
          onSubmit={onSubmit}
          confirmBtnText={t('add')}
        />
      </Container>
    </div>
  )
}
