import { t } from 'i18next';
import ApparelForm from 'src/components/apparel/ApparelForm';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { Apparel } from 'src/model/apparel';
import { useDispatch } from 'src/redux';
import { setDocumentTitle } from 'src/utils/services';
import { apparelAddAction } from './ApparelAddContext';

export default function ApparelAddPage() {
  const dispatch = useDispatch();

  setDocumentTitle(t('apparel.page.add.title'));

  const onImageAdd = (images: File[]) => {
    alert('Not yet implemented!');
  };

  const onSubmit = (apparel: Apparel) => {
    dispatch(apparelAddAction(apparel));
  };

  return (
    <div id="ApparelAddPage">
      <MobileHeader title={t('add')} />
      <CommonContainer>
        <h1 className="mb-3">{t('apparel.page.add.title')}</h1>
        <ApparelForm
          onImageAdd={onImageAdd}
          onSubmit={onSubmit}
          confirmBtnText={t('add')}
        />
      </CommonContainer>
    </div>
  )
}
