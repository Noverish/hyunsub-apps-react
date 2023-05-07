import { t } from 'i18next';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { apparelImageUploadAction, apparelUpdateAction } from './ApparelEditContext';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import ApparelForm from 'src/components/apparel/ApparelForm';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { Apparel } from 'src/model/apparel';
import { useDispatch } from 'src/redux';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelEditPage() {
  const apparelId = useParams().apparelId!!;
  const dispatch = useDispatch();

  const apparel = apparelDetailApi.useApi({ apparelId });
  const title = t('apparel.page.edit.title', [apparel.name]);

  useEffect(() => {
    setDocumentTitle(title);
  }, [title]);

  const onImageAdd = (images: File[]) => {
    dispatch(apparelImageUploadAction(apparelId, images));
  };

  const onSubmit = (newApparel: Apparel) => {
    dispatch(apparelUpdateAction(apparelId, newApparel));
  };

  return (
    <div id="ApparelEditPage">
      <MobileHeader title={title} back />
      <CommonContainer>
        <h1 className="mb-3">{t('apparel.page.edit.title', [apparel.name])}</h1>
        <ApparelForm apparel={apparel} onImageAdd={onImageAdd} onSubmit={onSubmit} confirmBtnText={t('modify')} />
      </CommonContainer>
    </div>
  );
}
