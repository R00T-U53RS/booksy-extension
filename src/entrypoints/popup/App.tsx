import { useState, useEffect } from 'react';

import Login from '@/components/login/Login';
import Sidebar from '@/components/sidebar/Sidebar';
import Bookmark from '@/components/bookmark/Bookmark';
import AddBrowser from '@/components/sidebar/AddBrowser';
import { Browser, NewBrowserFormData } from '@/components/types/browser';
import { chrome, brave, firefox, safari, edge, opera } from '@/assets/assets';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddBrowser, setShowAddBrowser] = useState(false);
  const [browsers, setBrowsers] = useState<Browser[]>([]);
  const [currentBrowser, setCurrentBrowser] = useState<Browser | null>(null);

  const getBrowserIcon = (type: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      chrome: <img src={chrome} alt='Chrome' className='w-6 h-6' />,
      brave: <img src={brave} alt='Brave' className='w-6 h-6' />,
      firefox: <img src={firefox} alt='Firefox' className='w-6 h-6' />,
      safari: <img src={safari} alt='Safari' className='w-6 h-6' />,
      edge: <img src={edge} alt='Edge' className='w-6 h-6' />,
      opera: <img src={opera} alt='Opera' className='w-6 h-6' />,
    };
    return iconMap[type] || <div className='w-6 h-6 bg-gray-400 rounded' />;
  };

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

  const handleCreateBrowser = (browserData: NewBrowserFormData) => {
    const newBrowser: Browser = {
      id: `${browserData.type}-${Date.now()}`,
      name: browserData.name,
      type: browserData.type,
      profileName: browserData.profileName,
      icon: getBrowserIcon(browserData.type),
      isConnected: true,
      bookmarkCount: 0,
      lastSync: new Date(),
    };

    setBrowsers(prev => [...prev, newBrowser]);
    setCurrentBrowser(newBrowser);
    setShowAddBrowser(false);
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
    <div className='flex h-[600px] w-[400px] overflow-hidden'>
      <Sidebar
        setBrowser={setCurrentBrowser}
        onLogout={handleLogout}
        browsers={browsers}
        onShowAddBrowser={() => setShowAddBrowser(true)}
      />
      <div className='flex-1 h-full min-w-0'>
        {showAddBrowser ? (
          <AddBrowser
            onBack={() => setShowAddBrowser(false)}
            onCreateBrowser={handleCreateBrowser}
          />
        ) : (
          <Bookmark
            profile={
              currentBrowser
                ? {
                    id: currentBrowser.id,
                    name: currentBrowser.name,
                    icon: currentBrowser.icon,
                  }
                : {
                    id: 'default',
                    name: 'No Browser Selected',
                    icon: <div className='w-6 h-6 bg-gray-400 rounded' />,
                  }
            }
          />
        )}
      </div>
    </div>
  );
};

export default App;
