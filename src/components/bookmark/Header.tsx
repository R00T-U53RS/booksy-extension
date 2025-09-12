import { Button } from "@/components/ui/button";
import { Profile } from "@/components/types/profile";

const BookmarkHeader = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex flex-col p-4 gap-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{profile.name}</div>
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
