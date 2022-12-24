import { Dropdown, DropdownButton } from 'react-bootstrap';
import { driveUploadAction } from 'src/pages/drive/DriveActions';
import { useDispatch } from 'src/redux';

interface Props {
  path: string;
}

export default function DriveUploadButton({ path }: Props) {
  const dispatch = useDispatch();

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
    <DropdownButton className="DriveUploadButton d-flex" align="end" title="Upload" menuVariant="dark">
      <Dropdown.Item onClick={onUploadFile}>Upload Files</Dropdown.Item>
      <Dropdown.Item onClick={onUploadFolder}>Upload Folder</Dropdown.Item>
    </DropdownButton>
  )
}
