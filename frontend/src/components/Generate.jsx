import { useState, useEffect } from "react";
import { getAllMemes } from "../api/memes";

function Generate() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllMemes().then((memes) => setData(memes.data.memes));
  }, []);

  return (
    <div className="flex justify-center sm:flex-row flex-col p-4 gap-x-4 items-center">
      <div>
        {data.map((el) => (
          <img
            src={el.url}
            alt="Preview"
            className="max-h-[300px]"
          />
        ))}
      </div>
      <div className="flex flex-col justify-around items-center h-[300px]">
        <p className="text-2xl text-orange-500 font-semibold">
          Write your text:
        </p>
        <div>
          <input
            type="text"
            className="border-2 border-orange-500 rounded-full bg-stone-900 outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            className="border-2 border-orange-500 rounded-full bg-stone-900 outline-none"
          />
        </div>
        <div className="flex justify-around w-full">
          <button className="bg-orange-500 rounded-lg py-2 px-4 text-slate-900 font-semibold">
            Generate
          </button>
          <button className="bg-orange-500 rounded-lg py-2 px-4 text-slate-900 font-semibold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Generate;
