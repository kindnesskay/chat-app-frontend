import { events } from "../constants";
import Events from "./Events";
import SuggestedGroup from "./SuggestedGroup";
import SuggestFriends from "./SuggestFriends";

export default function ThirdPannel() {
  return (
    <div className="flex flex-col gap-3 pr-2">
      <SuggestFriends />
      <Events eventsData={events} />
      <div>
        <SuggestedGroup />
      </div>
    </div>
  );
}
