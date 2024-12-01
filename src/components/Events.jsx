import { useState } from "react";
import Event from "./Event";

export default function Events({ eventsData }) {
  const [eventToDisplay, setEventToDisplay] = useState(3);
  const [eventToDisplayToggle, setEventToDisplayToggle] = useState("See all");

  function handleChangeEventToDisplay() {
    if (eventToDisplayToggle == "See all") {
      setEventToDisplay(eventsData.length);
      setEventToDisplayToggle("See less");
      return;
    } else {
      setEventToDisplay(3);
      setEventToDisplayToggle("See all");
    }
  }
  return (
    <div className="bg-white p-2 rounded-lg">
      <div className="flex justify-between mb-4">
        <p className="font-medium text-gray-400">Upcoming Events </p>
        {eventsData.length > 3 && (
          <button
            onClick={handleChangeEventToDisplay}
            className="text-blue-500 font-medium"
          >
            {eventToDisplayToggle}
          </button>
        )}
      </div>
      <div className=" flex flex-col gap-3">
        {eventsData.map((eventData, index) => {
          if (index < eventToDisplay) {
            return <Event eventData={eventData} key={eventData.id} />;
          }
        })}
      </div>
    </div>
  );
}
