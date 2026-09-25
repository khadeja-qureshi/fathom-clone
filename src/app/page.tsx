import { meetings } from "@/data/meetings";
import { MeetingsLibrary } from "./MeetingsLibrary";

export default function HomePage() {
  return <MeetingsLibrary meetings={meetings} />;
}
