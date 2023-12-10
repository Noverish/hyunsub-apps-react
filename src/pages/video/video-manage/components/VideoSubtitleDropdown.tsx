import { Control, useController } from 'react-hook-form';

import { VideoSubtitleSyncParams } from 'src/api/video/video-manage/video-subtitle-sync';
import CustomDropdown from 'src/components/common/select/CustomDropdown';
import { VideoSubtitle } from 'src/model/video';

interface Props {
  subtitles: VideoSubtitle[];
  control: Control<VideoSubtitleSyncParams>;
}

export default function VideoSubtitleDropdown({ subtitles, control }: Props) {
  const { field } = useController({ name: 'subtitleId', control });
  const { onChange } = field;

  const labelSelector = (v: VideoSubtitle) => v.label;

  const onSelect = (v: VideoSubtitle) => {
    onChange(v.id);
  };

  const value = subtitles.filter((v) => v.id === field.value)[0];

  return <CustomDropdown data={subtitles} labelSelector={labelSelector} onSelect={onSelect} value={value} />;
}
