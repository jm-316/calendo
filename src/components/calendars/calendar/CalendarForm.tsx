import { format, startOfToday } from "date-fns";
import { BsTextLeft } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineColorLens, MdOutlineSubtitles } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import { CalendarType, ColorsType, NewCalendarType } from "../../../interface";
import { COLORS } from "../../../utils/\bconstants";
import { RootState } from "../../../store/store";
import { useUser } from "../../../hook/useUser";
import { useCalendars } from "../../../hook/useCalendars";

export default function CalendarForm({
  isDetail,
  calendar,
  id,
}: {
  isDetail: boolean;
  calendar?: CalendarType[];
  id?: number;
}) {
  const today = startOfToday();
  const { user, isLoading } = useUser();
  const { newEvent, updatedEvent, removeEvent } = useCalendars(id);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorsType>(COLORS[0]);
  const [eventData, setEventData] = useState<NewCalendarType>({
    title: "",
    startDate: format(today, "yyyy-MM-dd"),
    startTime: "",
    endDate: "",
    endTime: "",
    content: "",
    color: COLORS[0].colorCode,
  });

  useEffect(() => {
    if (isDetail && calendar) {
      calendar.map((event) => {
        setEventData({
          title: event.title,
          startDate: event.startDate,
          startTime: event.startTime || "",
          endDate: event.endDate || "",
          endTime: event.endTime || "",
          content: event.content,
          color: event.color,
        });
        setSelectedColor(
          COLORS.find((color) => color.colorCode === event.color) || COLORS[0]
        );
      });
    }
  }, [isDetail, calendar]);

  useEffect(() => {
    setEventData((prevData) => ({
      ...prevData,
      color: selectedColor.colorCode,
    }));
  }, [selectedColor]);

  const selectedView = useSelector(
    (state: RootState) => state.scheduler.selectedView
  );

  const handleColorSelect = (color: ColorsType) => {
    setSelectedColor(color);
    setIsOpen(false);
  };

  const handleChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user && !isDetail) {
      const addEvent = {
        ...eventData,
        startTime: eventData.startTime || "",
        endTime: eventData.endTime || "",
        endDate: eventData.endDate || "",
        color: selectedColor.colorCode,
        userId: user?.id,
      };

      newEvent.mutate(addEvent);
      navigate("/calendars");
    }

    if (isDetail && id) {
      const updateEvent = {
        ...eventData,
        startTime: eventData.startTime || "",
        endTime: eventData.endTime || "",
        endDate: eventData.endDate || "",
        color: selectedColor.colorCode,
        id,
      };

      updatedEvent.mutate(updateEvent, {
        onSuccess: () => {
          navigate("/calendars");
        },
        onError: (error) => {
          console.error("Update failed:", error);
        },
      });
    }
  };

  const handleDeleteEvent = (id: number) => {
    const userConfirmed = window.confirm("삭제하시겠습니까?");
    if (userConfirmed) {
      removeEvent.mutate(id);
      navigate("/calendars");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="border-2 mx-auto rounded-lg mt-11 md:mt-22 w-10/12 md:h-[calc(100vh-200px)] lg:h-[calc(100vh-600px)] p-3 flex flex-col justify-center">
      <div className="w-11/12 mx-auto flex items-center mb-2 pr-3 md:w-9/12 ">
        <div className="w-full" />
        <div className="hover:bg-gray-200 p-3 hover:rounded-full group ">
          <RiDeleteBin6Line
            className="text-xl dark:text-white group-hover:dark:text-black"
            onClick={() => handleDeleteEvent(id as number)}
          />
        </div>
      </div>
      <div className="w-11/12 mx-auto flex items-center mb-3 md:mb-9 pr-3 md:w-9/12">
        <MdOutlineSubtitles className="text-2xl dark:text-white" />
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={eventData.title}
          onChange={handleChangeEvent}
          className="border-2 border-gray-200 w-full block ml-5 p-3 rounded-xl h-10 md:h-16"
        />
      </div>
      <div className="w-11/12 mx-auto flex items-center mb-3 md:mb-9 md:w-9/12">
        <IoTimeOutline className="text-2xl dark:text-white" />
        <div className="flex justify-stretch gap-4 ml-2 p-3 w-10/12 md:w-full flex-col lg:flex-row">
          <input
            type="date"
            name="startDate"
            required
            value={eventData.startDate}
            onChange={handleChangeEvent}
            className="border-2 block w-full p-1 md:p-2 rounded-xl h-10 md:h-16 text-sm lg:text-lg"
          />
          {selectedView === "day" ? (
            <>
              <input
                type="time"
                min="00:00"
                max="24:00"
                name="startTime"
                value={eventData.startTime}
                onChange={handleChangeEvent}
                className="border-2 block w-full p-1 md:p-2 rounded-xl h-10 md:h-16 text-sm lg:text-lg"
              />
              <input
                type="time"
                min="00:00"
                max="24:00"
                name="endTime"
                value={eventData.endTime}
                onChange={handleChangeEvent}
                className="border-2 block w-full p-1 md:p-2 rounded-xl h-10 md:h-16 text-sm lg:text-lg"
              />
            </>
          ) : (
            <input
              type="date"
              name="endDate"
              required
              value={eventData.endDate}
              onChange={handleChangeEvent}
              className="border-2 block w-full p-2 rounded-xl h-10 md:h-16 text-sm lg:text-lg"
            />
          )}
        </div>
      </div>
      <div className="w-11/12 mx-auto flex items-center md:mb-7 md:w-9/12">
        <BsTextLeft className="text-2xl dark:text-white" />
        <div className="p-3 w-full ml-2">
          <textarea
            className="w-full h-20 md:h-36 p-3 border-2 rounded-xl placeholder:text-sm placeholder:lg:text-lg"
            minLength={10}
            placeholder="내용을 입력해주세요."
            required
            name="content"
            value={eventData.content}
            onChange={handleChangeEvent}
          />
        </div>
      </div>
      <div className="w-11/12 mx-auto flex items-center md:w-9/12">
        <MdOutlineColorLens className="text-2xl dark:text-white" />
        <div className="relative inline-block w-52 md:w-60 lg:w-72 p-3 ml-2">
          <div
            className="flex items-center justify-between p-3 border-2 rounded-xl w-full"
            onClick={() => setIsOpen(!isOpen)}>
            <div className="w-full flex items-center">
              <span
                className="w-4 h-4 mr-2 rounded-full"
                style={{ backgroundColor: selectedColor.colorCode }}
              />
              <div className="w-10/12 md:w-full flex justify-between">
                <span className="text-sm md:text-lg dark:text-white">
                  {selectedColor.label}
                </span>
                <span className="text-gray-500">
                  {isOpen ? (
                    <div className="text-sm md:text-lg mr-3">▲</div>
                  ) : (
                    <div className="text-sm md:text-lg mr-3">▼</div>
                  )}
                </span>
              </div>
            </div>
            {isOpen && (
              <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                {COLORS.map((color) => (
                  <div
                    key={color.value}
                    onClick={() => handleColorSelect(color)}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100 dark:bg-gray-300">
                    <span
                      className="w-4 h-4 mr-2 rounded-full"
                      style={{ backgroundColor: color.colorCode }}
                    />
                    <span className="text-sm md:text-lg">{color.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-10/12 mt-2 md:mt-10 mx-auto flex items-center justify-around md:w-5/12">
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="block w-5/12 md:w-5/12 rounded-md px-2 lg:px-3.5 py-2 md:py-3.5 text-center text-sm md:text-lg font-semibold border-2 shadow-sm focus:outline-none hover:bg-indigo-500 hover:text-white  dark:bg-gray-200 dark:text-black dark:hover:bg-purple-400 dark:hover:border-purple-400  dark:hover:text-white">
          cancel
        </button>
        <button
          type="submit"
          className="block w-5/12 md:w-5/12 rounded-md bg-purple-400 px-3.5 py-2 md:py-3.5 text-center text-sm md:text-lg font-semibold text-white shadow-sm hover:bg-purple-500 dark:bg-indigo-700 dark:hover:bg-indigo-400">
          {isDetail ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
