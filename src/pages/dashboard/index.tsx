import CompletionRateChart from "../../components/dashboard/CompletionRateChart";
import Todos from "../../components/todo/Todos";
import WeeklyEvents from "../../components/dashboard/WeeklyEvents";
import MonthView from "../../components/calendars/calendar/MonthView";

export default function Dashboard() {
  return (
    <div className="container p-6 md:p-10 grid grid-cols-1 md:grid-cols-7 gap-10 lg:gap-12 lg:gap-x-16 overflow-y-auto [&::-webkit-scrollbar]:hidden ">
      <div className="h-[380px] md:h-[840px] lg:h-[1150px] row-span-5 col-span-4 gap-3 md:gap-20 bg-white rounded-2xl dark:bg-gray-200">
        <div className="md:h-[300px] lg:h-[400px] w-10/12 mx-auto mt-7 md:mt-12 border-2 rounded-2xl dark:bg-gray-900 dark:text-white">
          <div className="text-center md:text-xl lg:text-3xl font-bold py-5 md:py-2 lg:py-10">
            이달의 To-Do 현황
          </div>
          <div className="flex flex-col justify-between h-full lg:h-3/6">
            <CompletionRateChart />
          </div>
        </div>
        <div className="md:h-[400px] lg:h-[600px] w-10/12 border-2 mx-auto mt-10 p-1 rounded-2xl hidden md:block">
          <Todos />
        </div>
      </div>
      <div
        className={`bg-white h-52 md:h-[400px] lg:h-[550px] rounded-2xl col-span-4 md:col-span-3 overflow-y-auto [&::-webkit-scrollbar]:hidden dark:bg-gray-900`}>
        <h2 className="p-2 md:text-xl font-semibold text-center dark:text-white bg-white dark:bg-gray-900 sticky top-0 z-10">
          이번 주 일정
        </h2>
        <WeeklyEvents />
      </div>
      <div className="bg-white h-52 md:h-[400px] lg:h-[550px] rounded-2xl col-span-4 md:col-span-3 dark:bg-gray-900 dark:text-white">
        <MonthView isDashboard={true} />
      </div>
    </div>
  );
}
