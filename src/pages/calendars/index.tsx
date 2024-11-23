import { useDispatch, useSelector } from "react-redux";
import React, { useCallback } from "react";
import { RootState } from "../../store/store";
import { selectOptions } from "../../interface";
import { setSelectedView } from "../../slices/schedulerSlice";
import Scheduler from "../../components/calendars/scheduler/Scheduler";
import DateHeader from "../../components/calendars/DateHeader";
import DateNavigation from "../../components/calendars/DateNavigation";
import MonthView from "../../components/calendars/calendar/MonthView";
import { useUser } from "../../hook/useUser";

export default function CalendarsPage() {
  const dispatch = useDispatch();
  const { isLoading } = useUser();

  const selectedView = useSelector(
    (state: RootState) => state.scheduler.selectedView
  );

  const handleViewChange = useCallback(
    (view: selectOptions) => {
      dispatch(setSelectedView(view));
    },
    [dispatch]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-6 text-center md:text-left">
      <div className="container__content">
        <span className="text-2xl font-medium dark:text-white">Calendars</span>
        <div className="flex items-center justify-between flex-col mt-2 md:flex-row">
          <DateNavigation />
          <div className="border-2 p-2 rounded-md w-full mb-2 md:w-24 text-md">
            <select
              className="dark:bg-black dark:text-white outline-none"
              value={selectedView}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleViewChange(e.target.value as selectOptions)
              }>
              <option value="day">day</option>
              <option value="Month">Month</option>
            </select>
          </div>
        </div>
        {selectedView === "day" ? (
          <div className="overflow-y-scroll h-[calc(100vh-220px)]">
            <DateHeader />
            <Scheduler />
          </div>
        ) : (
          <MonthView isDashboard={false} />
        )}
      </div>
    </div>
  );
}
