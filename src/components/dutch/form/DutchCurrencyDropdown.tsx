import CustomDropdown from '../../common/select/CustomDropdown';
import { DutchCurrency, dutchCurrencyList } from 'src/model/dutch';

interface Props {
  value?: DutchCurrency;
  onChange: (v: DutchCurrency) => void;
  isInvalid?: boolean;
}

export default function DutchCurrencyDropdown(props: Props) {
  return <CustomDropdown<DutchCurrency> data={dutchCurrencyList} labelSelector={(v) => v} {...props} />;
}
