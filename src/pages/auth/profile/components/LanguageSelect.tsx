import ProfileHooks from '../ProfileHooks';
import CustomSelect from 'src/components/common/select/CustomSelect';
import { lang } from 'src/i18n';

interface UserLanguage {
  label: string;
  value: string;
}

const data: UserLanguage[] = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: '한국어',
    value: 'ko',
  },
];

export default function LanguageSelect() {
  const language = data.filter((v) => v.value === lang)[0];
  const updateLanguage = ProfileHooks.useUpdateLanguage();

  const onSelect = (value?: UserLanguage) => {
    if (value) {
      updateLanguage(value.value);
    }
  };

  return <CustomSelect data={data} labelSelector={(v) => v.label} onSelect={onSelect} value={language} />;
}
