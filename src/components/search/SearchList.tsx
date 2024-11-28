import { UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { CalendarType } from "../../interface";

export default function SearchList({
  searchEvent,
  handleCloseSearch,
}: {
  searchEvent: UseMutationResult<
    CalendarType[],
    unknown,
    { userId: string; searchQuery: string }
  >;
  handleCloseSearch: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="absolute top-full left-0 w-full bg-white z-50 border max-h-64 rounded-b-lg overflow-auto dark:bg-gray-200">
      <ul className="py-1.5">
        {searchEvent.data && searchEvent.data.length > 0 ? (
          searchEvent.data.map((event) => (
            <li
              key={event.id}
              className="mb-1 py-2"
              onClick={() => {
                navigate(`/calendars/${event.id}`);
                handleCloseSearch();
              }}>
              <div className="flex items-center justify-between p-2 px-5">
                <div className="flex items-center gap-6">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="dark:text-black">{event.title}</div>
                </div>

                <div className="dark:text-black">{event.startDate}</div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500 mb-1 py-2 p-5 md:p-7 text-xs md:text-lg">
            검색 결과가 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}
