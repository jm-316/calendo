import { useParams } from "react-router";
import { useCalendars } from "../../hook/useCalendars";
import CalendarForm from "../../components/calendars/calendar/CalendarForm";

export default function DetailPage() {
  const params = useParams();
  const calendarId = Number(params.id);
  const { calendar } = useCalendars(calendarId);

  return (
    <div className="container text-center md:text-left">
      <div className="container__content">
        <span className="text-2xl font-medium dark:text-white">Calendars</span>
        <CalendarForm isDetail={true} calendar={calendar} />
      </div>
    </div>
  );
}
