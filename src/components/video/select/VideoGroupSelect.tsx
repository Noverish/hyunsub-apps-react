import Select, { ActionMeta, SingleValue } from "react-select";
import videoGroups from "src/api/video/video-groups";
import { VideoGroupPreview } from "src/model/video";

const getOptionLabel = (option: VideoGroupPreview) => option.name;
const getOptionValue = (option: VideoGroupPreview) => option.id;

interface Props {
  onSelect?: (value: VideoGroupPreview | null) => void;
  disabled?: boolean;
}

export default function VieoGroupSelect(props: Props) {
  const { onSelect, disabled } = props;
  const groups = videoGroups.useApi();

  const onSelectChange = (newValue: SingleValue<VideoGroupPreview>, actionMeta: ActionMeta<VideoGroupPreview>) => {
    onSelect?.(newValue);
  }

  return (
    <Select
      classNamePrefix="select"
      menuPortalTarget={window.document.body}
      isClearable={true}
      isSearchable={true}
      isDisabled={disabled}

      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      options={groups}

      onChange={onSelectChange}
    />
  )
}
