import { useState, useEffect } from 'react';

import BookmarkHeader from '@/components/bookmark/Header';
import BookmarkList from '@/components/bookmark/List';
import { BookmarkTreeNode } from '@/components/types/bookmark';
import { Profile } from '@/components/types/profile';

const Bookmark = ({ profile }: { profile: Profile }) => {
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
    <div className='w-full overflow-hidden'>
      <BookmarkHeader profile={profile} />
      {bookmark?.children ? (
        <BookmarkList bookmark={bookmark.children} />
      ) : (
        <div>No Bookmarks</div>
      )}
    </div>
  );
};

export default Bookmark;
