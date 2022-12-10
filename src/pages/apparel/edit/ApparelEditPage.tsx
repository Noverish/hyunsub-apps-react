import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import apparelDetail from 'src/api/apparel/apparel-detail';
import ApparelForm from 'src/components/apparel/ApparelForm';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import CommonContainer from 'src/components/common/header/CommonContainer';
import { Apparel } from 'src/model/apparel';
import { useDispatch } from 'src/redux';
import { apparelImageUploadAction, apparelUpdateAction } from './ApparelEditContext';

export default function ApparelEditPage() {
  const apparelId = useParams().apparelId!!;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const apparel = apparelDetail.useApi({ apparelId });
  const title = t('apparel.page.edit.title', [apparel.name]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const onImageAdd = (images: File[]) => {
    dispatch(apparelImageUploadAction(apparelId, images));
  };

  const onSubmit = (newApparel: Apparel) => {
    dispatch(apparelUpdateAction(apparelId, newApparel));
  };

  return (
    <div id="ApparelEditPage">
      <ApparelHeader title={title} back={true} />
      <CommonContainer>
        <h1 className="mb-3">{t('apparel.page.edit.title', [apparel.name])}</h1>
        <ApparelForm
          apparel={apparel}
          onImageAdd={onImageAdd}
          onSubmit={onSubmit}
          confirmBtnText={t('modify')}
        />
      </CommonContainer>
    </div>
  )
}
