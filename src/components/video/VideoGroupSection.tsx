import { VideoGroup } from "src/model/video";
import VideoEntryList from "./VideoEntryList";

interface Props {
  group: VideoGroup;
}

export default function VideoGroupSection({ group }: Props) {
  return (
    <section id="VideoGroupSection">
      <hr />
      <h3 className="mb-3">다른 {group.name}</h3>
      <VideoEntryList entries={group.entries} />
    </section>
  )
}
