import { BookmarkTreeNode } from '@/components/types/bookmark';
import { Folder, ExternalLink } from 'lucide-react';
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

const BookmarkItem = ({ bookmark, depth = 0 }: BookmarkListProps) => {
  const indentClass = depth > 0 ? `ml-${depth * 4}` : '';

  return (
    <div className='space-y-2'>
      {bookmark.map((item, index) => {
        const isFolder = !item.url && item.children;

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
                    {item.children && item.children.length > 0 && (
                      <BookmarkItem
                        bookmark={item.children}
                        depth={depth + 1}
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div className='flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer group min-h-[60px]'>
                <div className='flex items-center gap-3 flex-1 min-w-0'>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${
                      new URL(item.url || '').hostname
                    }&sz=16`}
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
