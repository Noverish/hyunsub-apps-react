import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import ApparelBrandSelect from '../ApparelBrandSelect';
import ApparelCategorySelect from '../ApparelCategorySelect';
import { ApparelFormProvider } from './ApparelFormContext';
import { useApparelFormSubmit } from './ApparelFormHooks';
import ApparelImageUpload from './ApparelImageUpload';
import { ApparelDetailResult } from 'src/api/apparel/apparel-detail';
import { Apparel } from 'src/model/apparel';

interface Props {
  apparel?: ApparelDetailResult;
}

function ApparelForm({ apparel }: Props) {
  const defaultValues: Partial<Apparel> = apparel?.apparel ?? { id: '', buyDt: getToday() };

  const { register, handleSubmit, setValue, watch } = useForm<Apparel>({ defaultValues });
  const submit = useApparelFormSubmit(!!apparel);

  const onBrandSelect = (brand?: string) => {
    setValue('brand', brand ?? '');
  };

  const onCategorySelect = (category?: string) => {
    setValue('category', category ?? '');
  };

  const onSubmit = (data: Apparel) => {
    submit(data);
  };

  const btnText = apparel ? t('modify') : t('add');

  return (
    <div id="ApparelForm">
      <ApparelImageUpload images={apparel?.images ?? []} />
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
            <ApparelBrandSelect onSelect={onBrandSelect} value={watch('brand')} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.category')}</Form.Label>
            <ApparelCategorySelect onSelect={onCategorySelect} value={watch('category')} />
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

        <Form.Group>
          <Form.Check id="discarded" label={t('apparel.term.discarded')} {...register('discarded')} />
        </Form.Group>

        <div>
          <Button variant="primary" type="submit">
            {btnText}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default function ApparelFormIndex(props: Props) {
  return (
    <ApparelFormProvider>
      <ApparelForm {...props} />
    </ApparelFormProvider>
  );
}

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
