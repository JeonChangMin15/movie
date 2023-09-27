import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Search } from "@src/component/icon/Search";

export const Input = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search/${inputValue}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center mb-8">
      <div className="h-20 w-full bg-gradient-to-r from-[#e6fbfe] to-[#edddfb]"></div>
      <div className="absolute top-10">
        <input
          className="focus:outline-0 shadow-md w-[320px] h-16 rounded-lg text-base pl-16" // outline:0, shadow? border도 고려
          placeholder="Search..."
          onChange={handleInputValue}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute top-[18px] left-4">
          <Search />
        </div>
      </div>
    </div>
  );
};
