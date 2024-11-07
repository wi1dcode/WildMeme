import { useState, useEffect, createRef, useContext } from "react";
import { fetchMemes, createMeme } from "../api/memes";
import { exportComponentAsJPEG } from "react-component-export-image";
import Swal from "sweetalert2";

import Text from "./Text";

import RandomIcon from "../images/random.svg";
import TextIcon from "../images/type.svg";
import SaveIcon from "../images/save.svg";
import PostIcon from "../images/post.svg";
import UserContext from "../services/userContext";

function Generate() {
  const [data, setData] = useState([]);
  const [field, setField] = useState(0);
  const { connected } = useContext(UserContext);
  const [randomMeme, setRandomMeme] = useState(
    "https://i.imgflip.com/56p56k.jpg"
  );
  const generatingRef = createRef();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchMemes()
      .then((memes) => setData(memes))
      .catch((error) => console.error("Error fetching memes: ", error));
  }, []);

  const randomizeMeme = () => {
    const memeImg = data[Math.floor(Math.random() * data.length)];
    if (memeImg) {
      setRandomMeme(memeImg.url);
    }
  };

  const addText = () => {
    if (field < 4) setField(field + 1);
  };

  const handlePostMeme = () => {
    if (!connected) {
      Swal.fire({
        icon: "warning",
        title: "Not Connected",
        text: "You need to be connected to upload a meme.",
      });
      return;
    }
    exportComponentAsJPEG(generatingRef, { fileName: "meme" }).then((blob) => {
      const newFormData = new FormData();
      newFormData.append("image", blob, "meme.jpg");

      createMeme(newFormData)
        .then((response) => {
          alert("Meme uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error uploading meme: ", error);
          alert("Failed to upload meme.");
        });
    });
  };

  return (
    <div className="flex justify-center flex-col-reverse p-4 gap-y-3 items-center">
      {randomMeme && (
        <div
          ref={generatingRef}
          className={`flex bg-[url('${randomMeme}')] w-1/2 bg-contain bg-center bg-no-repeat h-[400px]`}
        >
          <div>
            {Array(field)
              .fill(0)
              .map((i) => {
                return <Text key={i} />;
              })}
          </div>
        </div>
      )}
      <div className="bg-orange-500 px-5 py-2 rounded-full gap-x-4 flex">
        <div
          className="bg-stone-900 rounded-full p-3 cursor-pointer"
          onClick={addText}
        >
          <img src={TextIcon} alt="Type" />
        </div>
        <div
          className="bg-stone-900 rounded-full p-3 cursor-pointer"
          onClick={randomizeMeme}
        >
          <img src={RandomIcon} alt="Change" />
        </div>
        <div
          className="bg-stone-900 rounded-full p-3 cursor-pointer"
          onClick={() => exportComponentAsJPEG(generatingRef)}
        >
          <img src={SaveIcon} alt="Save" />
        </div>
        <div
          className="bg-stone-900 rounded-full p-3 cursor-pointer"
          onClick={handlePostMeme}
        >
          <img src={PostIcon} alt="Post" />
        </div>
      </div>
    </div>
  );
}

export default Generate;
