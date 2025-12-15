import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrowserDisplayInfo } from '@/components/types/browser';
import { BookmarkTreeNode } from '@/components/types/bookmark';
import { profileApi } from '@/api/profile';

const BookmarkHeader = ({
  profile,
  bookmarks,
}: {
  profile: BrowserDisplayInfo;
  bookmarks?: BookmarkTreeNode;
}) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (!profile.id || profile.id === 'default' || !bookmarks) {
      return;
    }

    setIsSyncing(true);
    try {
      await profileApi.syncBookmarks(profile.id, bookmarks);
    } catch (error) {
      console.error('Failed to sync bookmarks:', error);
    } finally {
      setIsSyncing(false);
    }
  };

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
        <Button
          className='w-full bg-green-500 hover:bg-green-600'
          onClick={handleSync}
          disabled={
            isSyncing || !profile.id || profile.id === 'default' || !bookmarks
          }
        >
          {isSyncing ? 'Syncing...' : 'Sync now'}
        </Button>
        <Input type='text' placeholder='Search bookmarks...' />
      </div>
    </div>
  );
};

export default BookmarkHeader;
