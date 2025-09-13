import BookmarkItem from '@/components/bookmark/Item';
import { BookmarkTreeNode } from '@/components/types/bookmark';

interface BookmarkListProps {
  bookmark: BookmarkTreeNode[];
}

const BookmarkList = ({ bookmark }: BookmarkListProps) => {
  return (
    <div className='flex flex-col p-4 gap-4 h-full overflow-y-auto'>
      <BookmarkItem bookmark={bookmark} />
    </div>
  );
};

export default BookmarkList;
