import MemeCard from "./MemeCard";

export default function MemeList() {
  return (
    <div className="text-center border-t-2 border-orange-500">
      <h2 className="text-2xl pt-2 text-orange-500 font-bold">Uploaded list of memes from all users:</h2>
      <div className="sm:flex sm:gap-x-8 mb-4 justify-center items-center flex-wrap">
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
        <MemeCard />
      </div>
    </div>
  );
}
