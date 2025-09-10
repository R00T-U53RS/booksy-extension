import { useState, useEffect } from "react";
import BookmarkHeader from "@/components/bookmark/Header";
import BookmarkList from "@/components/bookmark/List";
import { BookmarkTreeNode } from "@/components/types/bookmark";

const Bookmark = () => {
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
    <div className="w-full">
      <BookmarkHeader />
      {bookmark?.children ? (
        <BookmarkList bookmark={bookmark.children} />
      ) : (
        <div>No Bookmarks</div>
      )}
    </div>
  );
};

export default Bookmark;
