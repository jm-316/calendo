import CalendarForm from "../../components/calendars/calendar/CalendarForm";

export default function CalendarNewPage() {
  return (
    <div className="container p-6 text-center md:text-left">
      <div className="container__content">
        <span className="text-2xl font-medium dark:text-white">Calendars</span>
        <CalendarForm isDetail={false} />
      </div>
    </div>
  );
}
