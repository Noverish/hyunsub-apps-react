import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import ApparelBrandSelect from './ApparelBrandSelect';
import ApparelCategorySelect from './ApparelCategorySelect';
import { ApparelFormContext, ApparelFormProvider } from './ApparelFormContext';
import ApparelImageUpload from './ApparelImageUpload';
import { Apparel, ApparelInfo } from 'src/model/apparel';
import { toDateString } from 'src/utils';

interface Props {
  apparel?: Apparel;
  onComplete: (apparel: ApparelInfo, uploads: File[], deletes: string[]) => void;
}

function ApparelForm({ apparel, onComplete }: Props) {
  const defaultValues: Partial<ApparelInfo> = apparel?.info ?? { buyDt: toDateString(new Date()) };

  const { register, handleSubmit, control } = useForm<ApparelInfo>({ defaultValues });
  const [{ uploads, deletes }] = useContext(ApparelFormContext);

  const onSubmit = (data: ApparelInfo) => {
    onComplete(data, uploads, deletes);
  };

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
            <ApparelBrandSelect control={control} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.category')}</Form.Label>
            <ApparelCategorySelect control={control} />
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
            {t('complete')}
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
