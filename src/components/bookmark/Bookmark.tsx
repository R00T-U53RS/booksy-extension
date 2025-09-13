import { useState, useEffect } from 'react';

import BookmarkHeader from '@/components/bookmark/Header';
import BookmarkList from '@/components/bookmark/List';
import { BookmarkTreeNode } from '@/components/types/bookmark';
import { BrowserDisplayInfo } from '@/components/types/browser';

const Bookmark = ({ profile }: { profile: BrowserDisplayInfo }) => {
  const [bookmark, setBookmarks] = useState<BookmarkTreeNode>();

  useEffect(() => {
    const getBookmarks = async () => {
      const bookmarks = await browser.bookmarks.getTree();
      setBookmarks(bookmarks[0]);
      console.log(bookmarks);
    };
    getBookmarks();
  }, []);

  return (
    <div className='flex flex-col h-full w-full min-w-0'>
      <BookmarkHeader profile={profile} />
      <div className='flex-1 overflow-y-auto hide-scrollbar'>
        {bookmark?.children ? (
          <BookmarkList bookmark={bookmark.children} />
        ) : (
          <div className='p-4 text-center text-muted-foreground'>
            No Bookmarks
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
