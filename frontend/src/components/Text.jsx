import { useState } from "react"
import Draggable from "react-draggable"
import DoneRoundedIcon from "@mui/icons-material/DoneRounded"

export default function Text() {
  const [editMode, setEditMode] = useState(false)
  const [texts, setTexts] = useState(["Double click to edit"])

  return (
    <>
      {texts.map((value, index) => (
        <Draggable key={index} disabled={editMode}>
          {editMode ? (
            <div className="flex justify-center px-4 items-center gap-y-3 border-b-2 border-orange-500 rounded-full w-[200px] shadow-lg bg-black/30">
              <input
                className="bg-transparent text-start text-2xl focus:outline-none text-border w-full"
                value={value}
                maxLength={40}
                onChange={(e) => {
                  const updatedTexts = [...texts]
                  updatedTexts[index] = e.target.value
                  setTexts(updatedTexts)
                }}
                onDoubleClick={() => {
                  setEditMode(false)
                }}
              />
              <DoneRoundedIcon
                sx={{
                  color: "green",
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() => {
                  setEditMode(false)
                }}
              />
            </div>
          ) : (
            <p
              className="text-border px-4 text-white text-2xl cursor-default active:cursor-move whitespace-pre-line"
              onDoubleClick={() => {
                setEditMode(true)
              }}
            >
              {value}
            </p>
          )}
        </Draggable>
      ))}
    </>
  )
}
