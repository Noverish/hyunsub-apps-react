import Select, { ActionMeta, SingleValue } from 'react-select';

import videoCategoryApi from 'src/api/video/video-category';
import { VideoCategory } from 'src/model/video';

const getOptionLabel = (option: VideoCategory) => option.displayName;
const getOptionValue = (option: VideoCategory) => option.name;

interface Props {
  onSelect?: (value: VideoCategory | null) => void;
  isInvalid?: boolean;
}

export default function VieoCategorySelect(props: Props) {
  const { onSelect, isInvalid } = props;
  const categories = videoCategoryApi.useApi({});

  const onSelectChange = (newValue: SingleValue<VideoCategory>, actionMeta: ActionMeta<VideoCategory>) => {
    onSelect?.(newValue);
  };

  return (
    <Select
      classNamePrefix="select"
      className={isInvalid ? 'is-invalid' : ''}
      menuPortalTarget={window.document.body}
      isClearable
      isSearchable
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      options={categories}
      onChange={onSelectChange}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 1100 }) }}
    />
  );
}
