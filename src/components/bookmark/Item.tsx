import { BookmarkTreeNode } from '@/components/types/bookmark';
import { Folder, ExternalLink, Bookmark } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface BookmarkListProps {
  bookmark: BookmarkTreeNode[];
  depth?: number;
}

const getFaviconUrl = (url: string | undefined): string => {
  if (!url) {
    return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="%23666"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>';
  }
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=16`;
  } catch {
    return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="%23666"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>';
  }
};

const BookmarkItem = ({ bookmark, depth = 0 }: BookmarkListProps) => {
  const indentClass = depth > 0 ? `ml-${depth * 4}` : '';

  if (!bookmark || bookmark.length === 0) {
    return (
      <div className='flex items-start justify-between px-8 py-1 text-center'>
        <Bookmark className='w-8 h-8 text-gray-300 mb-4' />
        <div className='flex flex-col items-center justify-center'>
          <p className='text-gray-500 text-sm font-medium'>
            No bookmarks found
          </p>
          <p className='text-gray-400 text-xs mt-1'>
            Your bookmarks will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {bookmark.map((item, index) => {
        const isFolder = !!item.children;

        return (
          <div key={item.id || index} className={indentClass}>
            {isFolder ? (
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem
                  value={`folder-${item.id || index}`}
                  className='border-none'
                >
                  <AccordionTrigger className='p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors hover:no-underline'>
                    <div className='flex items-center gap-3'>
                      <Folder className='w-5 h-5 text-amber-600' />
                      <span className='font-medium text-amber-800'>
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='pt-2 pb-0'>
                    <BookmarkItem
                      bookmark={item.children ?? []}
                      depth={depth + 1}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div className='flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer group min-h-[60px]'>
                <div className='flex items-center gap-3 flex-1 min-w-0'>
                  <img
                    src={getFaviconUrl(item.url)}
                    alt=''
                    className='w-4 h-4 flex-shrink-0'
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="%23666"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>';
                    }}
                  />
                  <div className='flex-1 min-w-0 max-w-full'>
                    <div className='font-medium text-blue-800 truncate max-w-full'>
                      {item.title}
                    </div>
                    <div className='text-sm text-blue-600 truncate max-w-full break-all'>
                      {item.url}
                    </div>
                  </div>
                  <ExternalLink className='w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0' />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookmarkItem;
