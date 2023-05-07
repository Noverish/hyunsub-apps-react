import { useEffect, useState } from 'react';
import { ActionMeta, InputActionMeta, SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import readdirDetail, { FileInfo } from 'src/api/file/readdir-detail';

const fileInfoToOption = (info: FileInfo): SelectOption => ({ label: info.path, value: info.path, isDir: info.isDir });

interface SelectOption {
  label: string;
  value: string;
  isDir: boolean;
}

interface State {
  path: string;
  loading: boolean;
  result: SelectOption[];
}

const defaultState: State = {
  path: '/',
  loading: true,
  result: [],
};

interface Props {
  onSelect?: (path: string) => void;
  isInvalid?: boolean;
}

export default function PathSelect({ onSelect, isInvalid }: Props) {
  const [state, setState] = useState(defaultState);
  const [inputValue, setInputValue] = useState('');
  const { path, result, loading } = state;

  useEffect(() => {
    readdirDetail
      .fetch(path)
      .then((result) => result.map((v) => fileInfoToOption(v)))
      .then((result) => setState((s) => ({ ...s, result, loading: false })));
  }, [path]);

  const getOption = (newPath: string) => result.filter((v) => v.value === newPath)[0];

  const setInputValue2 = (newPath: string) => {
    setInputValue(newPath);
    onSelect?.(newPath);
  };

  const onChange = (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
    const { action } = actionMeta;
    if (action !== 'select-option' && action !== 'create-option' && action !== 'clear') {
      return;
    }

    if (!newValue) {
      setState(defaultState);
      setInputValue2('');
      return;
    }

    const newPath = newValue.value;
    if (newValue.isDir) {
      const pathWithSlash = newPath.replace(/\/?$/, '/');
      setState({ path: pathWithSlash, result: [], loading: true });
      setInputValue2(pathWithSlash);
    } else {
      setInputValue2(newPath);
    }
  };

  const onInputChange = (newPath: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action !== 'input-change' && actionMeta.action !== 'set-value') {
      return;
    }

    setInputValue2(newPath);

    if (newPath.endsWith('/') && path !== newPath) {
      // 입력한 경로가 부모 경로인 경우
      if (path.startsWith(newPath)) {
        setState({ path: newPath, result: [], loading: true });
        return;
      }

      // 입력한 경로가 자식 폴더 경로인 경우
      const pathWithoutSlash = newPath.replace(/\/$/, '');
      const option = getOption(pathWithoutSlash);
      if (option && option.isDir) {
        setState({ path: newPath, result: [], loading: true });
        return;
      }
    }
  };

  const isValidNewOption = (newPath: string) => newPath !== path && newPath.length > 1 && !getOption(newPath);
  const formatCreateLabel = (newPath: string) => newPath;

  return <CreatableSelect menuPortalTarget={window.document.body} className={isInvalid ? 'is-invalid' : ''} classNamePrefix="select" isClearable closeMenuOnSelect={false} controlShouldRenderValue={false} isLoading={loading} options={result} onChange={onChange} inputValue={inputValue} onInputChange={onInputChange} createOptionPosition="first" formatCreateLabel={formatCreateLabel} isValidNewOption={isValidNewOption} />;
}
