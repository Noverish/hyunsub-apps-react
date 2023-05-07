import { useTranslation } from 'react-i18next';

import './ExtendedImage.scss';

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  onDelete?: () => void;
}

export function ExtendedImage(props: Props) {
  const { onDelete, ...imageProps } = props;

  const { t } = useTranslation();

  const onDeleteClick = () => {
    if (window.confirm(t('msg.delete-confirm') as string)) {
      onDelete?.();
    }
  };

  return (
    <div className="ExtendedImage ratio">
      <img {...imageProps} alt={imageProps.alt} />
      {onDelete && (
        <div className="delete" onClick={onDeleteClick}>
          <i className="fas fa-times"></i>
        </div>
      )}
    </div>
  );
}
