import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

import Login from '@/components/login/Login';
import Sidebar from '@/components/sidebar/Sidebar';
import Bookmark from '@/components/bookmark/Bookmark';
import { Profile } from '@/components/types/profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({
    id: 'home',
    name: 'Home',
    icon: <Home />,
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const isAuth = localStorage.getItem('booksy_authenticated');
        const loginTimestamp = localStorage.getItem('booksy_login_timestamp');

        if (isAuth === 'true' && loginTimestamp) {
          const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
          const isWithinValidPeriod =
            Date.now() - parseInt(loginTimestamp) < thirtyDaysInMs;

          if (isWithinValidPeriod) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('booksy_authenticated');
            localStorage.removeItem('booksy_user_email');
            localStorage.removeItem('booksy_login_method');
            localStorage.removeItem('booksy_login_timestamp');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('booksy_authenticated');
    localStorage.removeItem('booksy_user_email');
    localStorage.removeItem('booksy_login_method');
    localStorage.removeItem('booksy_login_timestamp');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className='flex h-[600px] w-[400px] bg-background items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
          <p className='text-sm text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className='flex h-[600px] w-[400px]'>
      <Sidebar setProfile={setProfile} onLogout={handleLogout} />
      <Bookmark profile={profile} />
    </div>
  );
};

export default App;
