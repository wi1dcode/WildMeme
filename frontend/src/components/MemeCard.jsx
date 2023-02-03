import { createRef } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import DonwloadIcon from "../images/download.svg";
import FavoriteIcon from "../images/favorite.svg";

export default function MemeCard() {
  const memeRef = createRef();

  return (
    <div
      ref={memeRef}
      className="max-w-sm bg-orange-500 rounded-lg text-center my-4 relative"
    >
      <div className="absolute right-2 top-2">
        <img
          src={FavoriteIcon}
          alt="download"
          className="mb-2 w-[30px] cursor-pointer"
        />
        <img
          src={DonwloadIcon}
          onClick={() => {
            exportComponentAsJPEG(memeRef);
          }}
          alt="download"
          className="w-[30px] cursor-pointer"
        />
      </div>
      <div>
        <img
          src="https://www.googleapis.com/download/storage/v1/b/kaggle-forum-message-attachments/o/inbox%2F10465213%2Fdc039d8cd72d8b454e0b9a33ba7e72a5%2Fprogrammerhumor-io-frontend-memes-programming-memes-4eacde1cc669487-608x574.webp?generation=1660784184136085&alt=media"
          alt="meme"
          className="rounded-lg"
        />
      </div>
      <div className="p-1">
        <p className="text-stone-900 font-semibold">by username</p>
      </div>
    </div>
  );
}
