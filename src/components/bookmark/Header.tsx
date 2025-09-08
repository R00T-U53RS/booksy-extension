import { Button } from "@/components/ui/button";

const BookmarkHeader = () => {
  return (
    <div className="w-full flex flex-col p-4 gap-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Profile Name</div>
        <div className="rounded-lg bg-gray-300 text-xs py-1 px-2">
          8 bookmarks
        </div>
      </div>
      <div>
        <Button className="w-full bg-blue-400">Add Current Page</Button>
      </div>
    </div>
  );
};

export default BookmarkHeader;
