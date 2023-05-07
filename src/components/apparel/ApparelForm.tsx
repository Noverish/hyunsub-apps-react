import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ExtendedImage } from '../common/ExtendedImage';
import ImageAddButton from '../common/ImageAddButton';
import ApparelBrandSelect from './ApparelBrandSelect';
import ApparelCategorySelect from './ApparelCategorySelect';
import { Apparel, ApparelImage } from 'src/model/apparel';
import { apparelImageDeleteAction } from 'src/pages/apparel/edit/ApparelEditContext';
import { useDispatch } from 'src/redux';

interface Props {
  apparel?: Apparel;
  onImageAdd?: (images: File[]) => void;
  onSubmit: (apparel: Apparel) => void;
  confirmBtnText: string;
}

export function ApparelFormImage({ image }: { image: ApparelImage }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(apparelImageDeleteAction(image));
  };

  return (
    <div className="col">
      <div className="ratio ratio-1x1">
        <ExtendedImage className="img-fluid" src={image.url + '?size=512'} loading="lazy" alt={image.imageId} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default function ApparelForm(props: Props) {
  const { apparel, onImageAdd, onSubmit, confirmBtnText } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, setValue } = useForm<Apparel>({ defaultValues: apparel });

  const onBrandSelect = (brand?: string) => {
    setValue('brand', brand ?? '');
  };

  const onCategorySelect = (category?: string) => {
    setValue('category', category ?? '');
  };

  const images = (apparel?.images || []).map((v) => <ApparelFormImage image={v} key={v.imageId} />);

  return (
    <div id="ApparelForm">
      <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">
        {images}
        <div className="col">
          <div className="ratio ratio-1x1">
            <ImageAddButton callback={onImageAdd} multiple />
          </div>
        </div>
      </div>
      <Form className="mt-3 d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>{t('apparel.term.name')}</Form.Label>
          <Form.Control {...register('name')} />
        </Form.Group>

        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.itemNo')}</Form.Label>
            <Form.Control {...register('itemNo')} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.brand')}</Form.Label>
            <ApparelBrandSelect onSelect={onBrandSelect} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.category')}</Form.Label>
            <ApparelCategorySelect onSelect={onCategorySelect} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.size')}</Form.Label>
            <Form.Control {...register('size')} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.color')}</Form.Label>
            <Form.Control {...register('color')} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.originPrice')}</Form.Label>
            <Form.Control type="number" {...register('originPrice')} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.discountPrice')}</Form.Label>
            <Form.Control type="number" {...register('discountPrice')} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.buyDt')}</Form.Label>
            <Form.Control {...register('buyDt')} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.buyLoc')}</Form.Label>
            <Form.Control {...register('buyLoc')} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.makeDt')}</Form.Label>
            <Form.Control {...register('makeDt')} />
          </Form.Group>
        </div>

        <Form.Group className="col">
          <Form.Label>{t('apparel.term.material')}</Form.Label>
          <Form.Control {...register('material')} />
        </Form.Group>

        <Form.Group className="col">
          <Form.Label>{t('apparel.term.size2')}</Form.Label>
          <Form.Control {...register('size2')} />
        </Form.Group>

        <div>
          <Button variant="primary" type="submit">
            {confirmBtnText}
          </Button>
        </div>
      </Form>
    </div>
  );
}
