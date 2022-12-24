import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { driveUploadAction } from 'src/pages/drive/DriveActions';
import { useDispatch } from 'src/redux';

interface Props {
  path: string;
}

export default function DriveUploadButton({ path }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onUpload = (input: HTMLInputElement) => {
    const result = Array.from(input.files || []).map(v => ({
      file: v,
      path: (v.webkitRelativePath === '') ? v.name : v.webkitRelativePath,
    }));

    dispatch(driveUploadAction(path, result));
  }

  const onUploadFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = () => onUpload(input);
    input.click();
  }

  const onUploadFolder = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('directory', '');
    input.setAttribute('mozdirectory', '');
    input.setAttribute('webkitdirectory', '');
    input.onchange = () => onUpload(input);
    input.click();
  }

  return (
    <DropdownButton className="DriveUploadButton d-flex" align="end" title={t('drive.DriveUploadButton.upload')} menuVariant="dark">
      <Dropdown.Item onClick={onUploadFile}>{t('drive.DriveUploadButton.upload-files')}</Dropdown.Item>
      <Dropdown.Item onClick={onUploadFolder}>{t('drive.DriveUploadButton.upload-folder')}</Dropdown.Item>
    </DropdownButton>
  )
}
