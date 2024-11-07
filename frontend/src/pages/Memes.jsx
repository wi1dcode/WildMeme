import React from "react";
import MemeList from "../components/MemeList";

function Memes() {
  return (
    <div className="flex items-center flex-col gap-y-6">
      <div className="mt-4 flex items-center ">
        <label
          htmlFor="HeadlineAct"
          className="block text-sm font-medium text-white"
        ></label>

        <select
          name="HeadlineAct"
          id="HeadlineAct"
          className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm p-2"
        >
          <option value="">Options</option>
          <option value="MY">My memes</option>
          <option value="POPULAR">Most Popular</option>
          <option value="RECENT">Recent</option>
          <option value="OLD">Older</option>
        </select>
      </div>
      <MemeList />
    </div>
  );
}

export default Memes;
