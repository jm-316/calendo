import EventColumn from "./EventColumn";
import TimeColumn from "./TimeColumn";

export default function Scheduler() {
  return (
    <div className="border-x-2">
      <div className="flex">
        <TimeColumn />
        <EventColumn />
      </div>
    </div>
  );
}
