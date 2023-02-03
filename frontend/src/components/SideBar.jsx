import HomeIcon from "../images/home.svg";
import LogoutIcon from "../images/power.svg";
import SettingsIcon from "../images/settings.svg";
import MemesIcon from "../images/layers.svg";
import Favorites from "../images/myfavorite.svg";

export default function SideBar() {
  return (
    <>
      <aside
        id="default-sidebar"
        className="h-screen z-40 fixed bg-orange-500 py-10 px-1 flex flex-col justify-between transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="border-b-2 border-slate-900 pb-5 ">
          <img
            src="https://stewartwilliam.com/wp-content/uploads/2021/02/Stewart-William.png"
            alt="logo"
            className="rounded-full w-[70px] bg-black m-auto"
          />
        </div>
        <div className="m-auto overflow-y-auto w-1/2">
          <div className="mb-5">
            <img src={HomeIcon} alt="Add" className="w-full" />
          </div>
          <div className="mb-5">
            <img src={MemesIcon} alt="Memes" className="w-full" />
          </div>
          <div className="mb-5">
            <img src={Favorites} alt="Favorites" className="w-full" />
          </div>
          <div className="mb-5">
            <img src={SettingsIcon} alt="Settings" className="w-full" />
          </div>
          <div>
            <img src={LogoutIcon} alt="LogOut" className="w-full" />
          </div>
          <div></div>
        </div>
        <div className="flex justify-center flex-col items-center text-black border-t-2 border-slate-900  pt-5">
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt="avatar"
            className="w-[60px] rounded-full mb-2"
          />
          <p>username</p>
        </div>
      </aside>
    </>
  );
}
