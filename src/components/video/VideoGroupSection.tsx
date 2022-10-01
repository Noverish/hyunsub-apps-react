import { useTranslation } from "react-i18next";
import { VideoCategory, VideoGroup } from "src/model/video";
import VideoEntryList from "./VideoEntryList";

interface Props {
  category: VideoCategory;
  group: VideoGroup;
}

export default function VideoGroupSection({ category, group }: Props) {
  const { t } = useTranslation();

  return (
    <section id="VideoGroupSection">
      <hr />
      <h3 className="mb-3">{t('video.group-section.title', [group.name])}</h3>
      <VideoEntryList category={category} entries={group.entries} />
    </section>
  )
}
