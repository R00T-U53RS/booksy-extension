import { useState } from 'react';
import { Home, Briefcase, Book, Plus } from 'lucide-react';

import { Profile } from '@/components/types/profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = ({
  setProfile,
}: {
  setProfile: (profile: Profile) => void;
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
        <Avatar className='w-12 h-12'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback className='bg-blue-500 text-white text-sm font-semibold'>
            B
          </AvatarFallback>
        </Avatar>
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

      <div className='px-2 pb-4'>
        <div className='flex items-center justify-center w-14 h-14 border-2 border-dashed border-slate-600 text-slate-600 hover:text-slate-500 rounded-lg cursor-pointer hover:border-slate-500 transition-colors duration-200'>
          <Plus className='w-6 h-6' />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
