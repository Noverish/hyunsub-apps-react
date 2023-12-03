import { t } from 'i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import DriveUploadHooks from 'src/components/drive/upload/DriveUploadHooks';
import { FileWithPath } from 'src/model/file';

export default function DriveUploadButton() {
  const ready = DriveUploadHooks.useReady();

  const onUpload = (input: HTMLInputElement) => {
    const files: FileWithPath[] = Array.from(input.files || [])
      .filter((v) => v.name !== '.DS_Store')
      .map((v) => ({
        file: v,
        path: (v.webkitRelativePath ? v.webkitRelativePath : v.name).normalize('NFC'),
        type: v.type,
      }));

    if (files.length > 0) {
      ready(files);
    }
  };

  const onUploadFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = () => onUpload(input);
    input.click();
  };

  const onUploadFolder = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('directory', '');
    input.setAttribute('mozdirectory', '');
    input.setAttribute('webkitdirectory', '');
    input.onchange = () => onUpload(input);
    input.click();
  };

  return (
    <DropdownButton className="DriveUploadButton d-flex" title={t('drive.DriveUploadButton.upload')} menuVariant="dark">
      <Dropdown.Item onClick={onUploadFile}>{t('drive.DriveUploadButton.upload-files')}</Dropdown.Item>
      <Dropdown.Item onClick={onUploadFolder}>{t('drive.DriveUploadButton.upload-folder')}</Dropdown.Item>
    </DropdownButton>
  );
}
