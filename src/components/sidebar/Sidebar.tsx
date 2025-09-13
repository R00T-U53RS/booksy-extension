import { useState } from 'react';
import { Plus, LogOut } from 'lucide-react';

import { Browser } from '@/components/types/browser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

const Sidebar = ({
  setBrowser,
  onLogout,
  browsers,
  onShowAddBrowser,
}: {
  setBrowser: (browser: Browser) => void;
  onLogout?: () => void;
  browsers: Browser[];
  onShowAddBrowser: () => void;
}) => {
  const [activeSection, setActiveSection] = useState('');

  return (
    <div className='flex flex-col items-center w-20 bg-slate-950 flex-shrink-0'>
      <div className='flex items-center justify-center py-6'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className='w-12 h-12'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback className='bg-blue-500 text-white text-sm font-semibold'>
                B
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>Profile</DropdownMenuItem>
              <DropdownMenuItem disabled>Billing</DropdownMenuItem>
              <DropdownMenuItem disabled>Settings</DropdownMenuItem>
              <DropdownMenuItem disabled>Support</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className='cursor-pointer'>
              <p className='text-red-500 hover:text-red-600'>Log out</p>
              <LogOut className='w-4 h-4 text-red-500 hover:text-red-600' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex flex-col space-y-4 flex-1 overflow-y-auto hide-scrollbar'>
        {browsers.map(browser => (
          <div
            key={browser.id}
            onClick={() => {
              setActiveSection(browser.id);
              setBrowser(browser);
            }}
            className={`
              relative flex flex-col items-center justify-center w-14 h-14 rounded-lg cursor-pointer transition-all duration-200
              ${
                activeSection === browser.id
                  ? 'bg-blue-600'
                  : 'bg-slate-800 hover:bg-slate-600'
              }
            `}
          >
            <div
              className={`flex flex-col items-center justify-center rounded-lg text-sm font-bold ${activeSection === browser.id ? 'text-white' : 'text-slate-400'}`}
            >
              <span className='w-6 h-6'>{browser.icon}</span>
              <span className='text-xs truncate w-12 text-center'>
                {browser.name.split(' - ')[0]}
              </span>
            </div>
            {browser.isConnected && (
              <div className='absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950' />
            )}
          </div>
        ))}
      </div>

      <div className='px-2 pb-4 space-y-2'>
        <div
          onClick={onShowAddBrowser}
          className='flex items-center justify-center w-14 h-14 border-2 border-dashed border-slate-600 text-slate-600 hover:text-slate-500 rounded-lg cursor-pointer hover:border-slate-500 transition-colors duration-200'
        >
          <Plus className='w-6 h-6' />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
