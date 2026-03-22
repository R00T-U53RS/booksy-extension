import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrowserDisplayInfo } from '@/components/types/browser';
import { BookmarkTreeNode } from '@/components/types/bookmark';
import { profileApi } from '@/api/profile';

const countBookmarks = (node?: BookmarkTreeNode): number => {
  if (!node) return 0;
  let count = node.url ? 1 : 0;
  if (node.children) {
    node.children.forEach(child => {
      count += countBookmarks(child);
    });
  }
  return count;
};

const BookmarkHeader = ({
  profile,
  bookmarks,
  searchQuery,
  onSearch,
}: {
  profile: BrowserDisplayInfo;
  bookmarks?: BookmarkTreeNode;
  searchQuery: string;
  onSearch: (query: string) => void;
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const bookmarkCount = countBookmarks(bookmarks);

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
          {bookmarkCount} bookmarks
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
        <Input
          type='text'
          placeholder='Search bookmarks...'
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BookmarkHeader;
