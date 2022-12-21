import { Dropdown, DropdownButton } from 'react-bootstrap';
import { driveUploadAction } from 'src/pages/drive/DriveContext';
import { useDispatch } from 'src/redux';

export default function DriveUploadButton() {
  const dispatch = useDispatch();

  const onUpload = (input: HTMLInputElement) => {
    const result = Array.from(input.files || []).map(v => ({
      file: v,
      path: (v.webkitRelativePath === '') ? v.name : v.webkitRelativePath,
    }));

    dispatch(driveUploadAction(result));
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
    <DropdownButton className="DriveUploadButton" align="end" title="Upload" menuVariant="dark">
      <Dropdown.Item onClick={onUploadFile}>Upload Files</Dropdown.Item>
      <Dropdown.Item onClick={onUploadFolder}>Upload Folder</Dropdown.Item>
    </DropdownButton>
  )
}
