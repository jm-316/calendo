import {
  addDays,
  addMonths,
  format,
  startOfToday,
  subDays,
  subMonths,
} from "date-fns";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../../store/store";
import { selectCurrentDate, setCurrentDate } from "../../slices/schedulerSlice";

export default function DateNavigation() {
  const today = startOfToday();

  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const selectedView = useSelector(
    (state: RootState) => state.scheduler.selectedView
  );

  const todayHandler = useCallback(
    () => dispatch(setCurrentDate(today.toISOString())),
    [dispatch]
  );

  const nextDayHandler = useCallback(() => {
    const newDate = addDays(currentDate, 1);
    dispatch(setCurrentDate(newDate.toISOString()));
  }, [dispatch, currentDate]);

  const prevDayHandler = useCallback(() => {
    const newDate = subDays(currentDate, 1);
    dispatch(setCurrentDate(newDate.toISOString()));
  }, [dispatch, currentDate]);

  const nextMonthHandler = useCallback(() => {
    const newDate = addMonths(currentDate, 1);
    dispatch(setCurrentDate(newDate.toISOString()));
  }, [dispatch, currentDate]);

  const prevMonthHandler = useCallback(() => {
    const newDate = subMonths(currentDate, 1);
    dispatch(setCurrentDate(newDate.toISOString()));
  }, [dispatch, currentDate]);

  return (
    <div className="flex gap-3 items-center mt-2 mb-4 dark:text-white">
      <button
        onClick={todayHandler}
        className="lg:border-2 lg:rounded-md lg:p-2 lg:text-sm lg:block hidden">
        Today
      </button>
      <button
        onClick={selectedView === "day" ? prevDayHandler : prevMonthHandler}>
        <CiCircleChevLeft className="text-lg" />
      </button>
      <>
        <div className="block md:hidden">{format(currentDate, "LLLL")}</div>
        <div className="hidden md:block">
          {format(currentDate, "LLLL yyyy")}
        </div>
      </>
      <button
        onClick={selectedView === "day" ? nextDayHandler : nextMonthHandler}>
        <CiCircleChevRight className="text-lg" />
      </button>
    </div>
  );
}
