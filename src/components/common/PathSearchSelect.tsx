import { useEffect, useState } from 'react';
import Select, { ActionMeta, components, InputActionMeta, SingleValue, StylesConfig } from 'react-select';
import readdirDetail, { FileInfo } from 'src/api/file/readdir-detail';

const Input = (props: any) => <components.Input {...props} isHidden={false} />;
const getOptionLabel = (option: FileInfo) => option.path;
const getOptionValue = (option: FileInfo) => option.path;

interface State {
  path: string;
  loading: boolean;
  result: FileInfo[];
}

const defaultState: State = {
  path: '/',
  loading: false,
  result: [],
}

interface Props {
  onSelect?: (value: FileInfo | null) => void;
  isInvalid?: boolean;
}

export default function PathSearchSelect({ onSelect, isInvalid }: Props) {
  const [state, setState] = useState(defaultState);
  const [inputValue, setInputValue] = useState(defaultState.path);
  const { path, result, loading } = state;

  useEffect(() => {
    readdirDetail.fetch(path)
      .then((result) => setState(s => ({ ...s, result, loading: false })));
  }, [path]);

  const onChange = (newValue: SingleValue<FileInfo>, actionMeta: ActionMeta<FileInfo>) => {
    if (actionMeta.action === 'select-option' && newValue) {
      const newPath = newValue.path;
      if (newValue.isDir) {
        setState({ path: newPath, result: [], loading: true });
      } else {
        onSelect?.(newValue);
      }
      setInputValue(newPath);
    } else if (actionMeta.action === 'clear') {
      setState(defaultState);
      setInputValue(defaultState.path);
      onSelect?.(null);
    }
  }

  const onInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === 'input-change') {
      setInputValue(newValue);
    }
  }

  return (
    <Select
      menuPortalTarget={window.document.body}
      className={isInvalid ? 'is-invalid' : ''}
      isClearable={true}
      isLoading={loading}
      classNamePrefix="select"
      options={result}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      closeMenuOnSelect={false}
      inputValue={inputValue}
      onChange={onChange}
      controlShouldRenderValue={false}
      onInputChange={onInputChange}
      components={{
        Input
      }}
    />
  )
}
