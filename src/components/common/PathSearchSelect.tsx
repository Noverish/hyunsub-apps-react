import { useEffect, useState } from 'react';
import Select, { ActionMeta, components, InputActionMeta, SingleValue, StylesConfig } from 'react-select';
import readdirDetail, { FileInfo } from 'src/api/file/readdir-detail';

const Input = (props: any) => <components.Input {...props} isHidden={false} />;
const getOptionLabel = (option: FileInfo) => option.path;
const getOptionValue = (option: FileInfo) => option.path;

const styleConfig: StylesConfig<FileInfo, false> = {
  input: (styles) => ({
    ...styles,
    color: 'white',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'black',
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused ? '#333' : undefined,
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'black',
  }),
  singleValue: (style) => ({
    ...style,
    color: 'white',
  })
};

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

export default function PathSearchSelect() {
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
      }
      setInputValue(newPath);
    } else if (actionMeta.action === 'clear') {
      setState(defaultState);
      setInputValue(defaultState.path);
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
      isClearable={true}
      isLoading={loading}
      styles={styleConfig}
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
