import { useTranslation } from 'react-i18next';
import './ExtendedImage.scss';

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  onDelete?: () => void;
}

export function ExtendedImage(props: Props) {
  const { onDelete, ...imageProps } = props;

  const { t } = useTranslation();

  const onDeleteClick = () => {
    if (window.confirm(t('ExtendedImage.msg.delete-confirm'))) {
      onDelete?.();
    }
  }

  return (
    <div className="ExtendedImage ratio">
      <img {...imageProps} />
      {onDelete && <div className="delete" onClick={onDeleteClick}>
        <i className="fas fa-times"></i>
      </div>}
    </div>
  )
}
