import { useState } from "react";
import Draggable from "react-draggable";

export default function Text() {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("Double click to edit");

  return (
    <Draggable>
      {editMode ? (
        <input
          className="bg-transparent	border-b-2 border-orange-500 text-center text-2xl rounded-full focus:outline-none text-border"
          value={value}
          onDoubleClick={(e) => {
            setEditMode(false);
          }}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <p
          className="text-border text-white text-2xl cursor-default active:cursor-move"
          onDoubleClick={(e) => {
            setEditMode(true);
          }}
        >
          {value}
        </p>
      )}
    </Draggable>
  );
}
