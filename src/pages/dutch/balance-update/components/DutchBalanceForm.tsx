import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import DutchBalanceUpdateHooks from '../DutchBalanceUpdateHooks';
import { DutchBalanceUpdateBulkParams } from 'src/api/dutch/dutch-balance-update-bulk';
import { DutchBalance } from 'src/model/dutch';
import DuthcBalanceFormItem from 'src/pages/dutch/balance-update/components/DuthcBalanceFormItem';

interface Props {
  list: DutchBalance[];
}

export default function DutchBalanceForm({ list }: Props) {
  const defaultValues = DutchBalanceUpdateHooks.useDefaultValues(list);
  const methods = useForm<DutchBalanceUpdateBulkParams>({ defaultValues });
  const { handleSubmit } = methods;

  const controls = list.map((v, i) => <DuthcBalanceFormItem key={v.currency} index={i} />);

  const update = DutchBalanceUpdateHooks.useUpdate();

  return (
    <FormProvider {...methods}>
      <Form className="DutchBalanceForm d-grid gap-3" onSubmit={handleSubmit(update)}>
        {controls}
        <Button type="submit">{t('complete')}</Button>
      </Form>
    </FormProvider>
  );
}
