import { useState } from 'react';
import { Home, Briefcase, Book, Plus, LogOut } from 'lucide-react';

import { Profile } from '@/components/types/profile';
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
  setProfile,
  onLogout,
}: {
  setProfile: (profile: Profile) => void;
  onLogout?: () => void;
}) => {
  const [activeSection, setActiveSection] = useState('home');

  const profileItems: Profile[] = [
    { id: 'home', name: 'Home', icon: <Home /> },
    { id: 'work', name: 'Work', icon: <Briefcase /> },
    { id: 'study', name: 'Study', icon: <Book /> },
  ];

  return (
    <div className='flex flex-col items-center w-24 bg-slate-950'>
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

      <div className='flex flex-col space-y-4 flex-1'>
        {profileItems.map(item => (
          <div
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              setProfile(item);
            }}
            className={`
              relative flex flex-col items-center justify-center w-14 h-14 rounded-lg cursor-pointer transition-all duration-200
              ${
                activeSection === item.id
                  ? 'bg-blue-600'
                  : 'bg-slate-800 hover:bg-slate-600'
              }
            `}
          >
            <div
              className={`flex flex-col items-center justify-center rounded-lg text-sm font-bold ${activeSection === item.id ? 'text-white' : 'text-slate-400'}`}
            >
              <span className='w-6 h-6'>{item.icon}</span>
              <span className='text-xs'>{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className='px-2 pb-4 space-y-2'>
        <div className='flex items-center justify-center w-14 h-14 border-2 border-dashed border-slate-600 text-slate-600 hover:text-slate-500 rounded-lg cursor-pointer hover:border-slate-500 transition-colors duration-200'>
          <Plus className='w-6 h-6' />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
