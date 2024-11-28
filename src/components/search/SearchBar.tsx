import { IoIosSearch } from "react-icons/io";
import React, { useState } from "react";
import SearchList from "./SearchList";
import { useCalendars } from "../../hook/useCalendars";
import { useUser } from "../../hook/useUser";

export default function SearchBar({ dark }: { dark: boolean }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);

  const { user } = useUser();
  const { searchEvent } = useCalendars(undefined, user?.id);

  if (!user) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchQuery.trim()) {
        searchEvent.mutate({ userId: user?.id, searchQuery });
        setIsKeyDown(!isKeyDown);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      searchEvent.reset();
      setIsKeyDown(false);
    }
  };

  const handleCloseSearch = () => {
    setIsKeyDown(false);
  };

  return (
    <>
      <div className="absolute left-2 top-[13px] ">
        <IoIosSearch />
      </div>
      <div className="w-full relative flex flex-col">
        <input
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`placeholder-opacity-0 block text-sm md:text-lg w-full rounded-md border-2 py-1.5 pl-5 md:pl-7 focus:outline-none ${
            dark ? "dark" : ""
          } ${isKeyDown ? "rounded-b-none" : ""} `}
          placeholder="search"
        />
        {isKeyDown && (
          <SearchList
            searchEvent={searchEvent}
            handleCloseSearch={handleCloseSearch}
          />
        )}
      </div>
    </>
  );
}
