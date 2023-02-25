import { useTranslation } from "react-i18next";
import { VideoCategory, VideoGroupDetail } from "src/model/video";
import VideoEntryList from "src/components/video/VideoEntryList";

interface Props {
  category: VideoCategory;
  group: VideoGroupDetail;
}

export default function VideoGroupSection({ category, group }: Props) {
  const { t } = useTranslation();

  return (
    <section id="VideoGroupSection">
      <hr className="my-2 my-md-3" />
      <h3 className="mb-3">{t('video.group-section.title', [group.name])}</h3>
      <VideoEntryList category={category} entries={group.entries} />
    </section>
  )
}
