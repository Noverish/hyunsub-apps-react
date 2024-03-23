import { t } from 'i18next';
import { useContext } from 'react';

import PhotoSelectHooks from './PhotoSelectHooks';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import { HeaderButton, HeaderProps } from 'src/model/component';

function useHeaderProps(onComplete?: () => void): HeaderProps {
  const [{ selects }] = useContext(PhotoSelectContext);
  const onClose = PhotoSelectHooks.useClear();

  const title = t('n-selected', [selects.length]);

  const btns: HeaderButton[] = [
    {
      icon: 'fas fa-check',
      name: t('complete'),
      onClick: () => onComplete?.(),
    },
  ];

  return {
    title,
    btns,
    onClose,
  };
}

const PhotoSelectHeaderHooks = {
  useHeaderProps,
};

export default PhotoSelectHeaderHooks;
