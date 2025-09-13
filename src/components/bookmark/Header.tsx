import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrowserDisplayInfo } from '@/components/types/browser';

const BookmarkHeader = ({ profile }: { profile: BrowserDisplayInfo }) => {
  return (
    <div className='flex flex-col p-4 gap-4 border-b border-gray-200'>
      <div className='flex justify-between items-center'>
        <div className='text-sm font-bold'>{profile.name}</div>
        <div className='rounded-lg bg-gray-300 text-xs py-1 px-2'>
          8 bookmarks
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <Button className='w-full bg-blue-400'>Add Current Page</Button>
        <Input type='text' placeholder='Search bookmarks...' />
      </div>
    </div>
  );
};

export default BookmarkHeader;
