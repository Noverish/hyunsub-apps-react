import Select, { ActionMeta, SingleValue } from 'react-select';

import videoGroups from 'src/api/video/video-group';
import { VideoGroup } from 'src/model/video';

const getOptionLabel = (option: VideoGroup) => option.name;
const getOptionValue = (option: VideoGroup) => option.id;

interface Props {
  onSelect?: (value: VideoGroup | null) => void;
  disabled?: boolean;
}

export default function VieoGroupSelect(props: Props) {
  const { onSelect, disabled } = props;
  const groups = videoGroups.useApi({});

  const onSelectChange = (newValue: SingleValue<VideoGroup>, actionMeta: ActionMeta<VideoGroup>) => {
    onSelect?.(newValue);
  };

  return (
    <Select
      classNamePrefix="select"
      menuPortalTarget={window.document.body}
      isClearable
      isSearchable
      isDisabled={disabled}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      options={groups}
      onChange={onSelectChange}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 1100 }) }}
    />
  );
}
