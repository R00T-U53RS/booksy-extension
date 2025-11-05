import { useState, useEffect } from 'react';

import Auth from '@/components/login/Auth';
import Sidebar from '@/components/sidebar/Sidebar';
import Bookmark from '@/components/bookmark/Bookmark';
import ProfileList from '@/components/profile/ProfileList';
import CreateProfile from '@/components/profile/CreateProfile';
import { Browser } from '@/components/types/browser';
import { Profile, CreateProfileRequest } from '@/api/profile';
import { useLogin } from '@/hooks/useLogin';
import { useProfiles } from '@/hooks/useProfiles';

const SELECTED_PROFILE_KEY = 'booksy_selected_profile_id';

const App = () => {
  const { isAuthenticated, isLoading: isLoadingAuth, logout } = useLogin();
  const {
    profiles,
    isLoading: isLoadingProfiles,
    create: createProfile,
    isCreating,
  } = useProfiles();

  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [browsers, setBrowsers] = useState<Browser[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showProfileList, setShowProfileList] = useState(false);

  // Load selected profile from localStorage and check if it still exists
  useEffect(() => {
    if (isAuthenticated && !isLoadingProfiles && profiles.length > 0) {
      const selectedProfileId = localStorage.getItem(SELECTED_PROFILE_KEY);
      if (selectedProfileId) {
        const profile = profiles.find(p => p.id === selectedProfileId);
        if (profile) {
          setSelectedProfile(profile);
          setShowProfileList(false);
          return;
        }
      }
      // If no selected profile or selected profile doesn't exist, show profile list
      setShowProfileList(true);
    } else if (isAuthenticated && !isLoadingProfiles && profiles.length === 0) {
      // No profiles exist, show profile list (which will show create option)
      setShowProfileList(true);
    }
  }, [isAuthenticated, isLoadingProfiles, profiles]);

  // Reset state on logout
  useEffect(() => {
    if (!isAuthenticated) {
      setBrowsers([]);
      setSelectedProfile(null);
      setShowProfileList(false);
      setShowCreateProfile(false);
      localStorage.removeItem(SELECTED_PROFILE_KEY);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
  };

  const handleSelectProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowProfileList(false);

    // Save selected profile
    localStorage.setItem(SELECTED_PROFILE_KEY, profile.id);
  };

  const handleCreateProfile = () => {
    setShowCreateProfile(true);
    setShowProfileList(false);
  };

  const handleCreateProfileSubmit = (data: CreateProfileRequest) => {
    createProfile(data, {
      onSuccess: newProfile => {
        setSelectedProfile(newProfile);
        setShowCreateProfile(false);
        localStorage.setItem(SELECTED_PROFILE_KEY, newProfile.id);
      },
    });
  };

  if (isLoadingAuth) {
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
    return <Auth />;
  }

  // Show create profile screen
  if (showCreateProfile) {
    return (
      <div className='flex h-[600px] w-[400px] overflow-hidden'>
        <CreateProfile
          onBack={() => {
            setShowCreateProfile(false);
            // If no profiles exist, show profile list
            if (profiles.length === 0) {
              setShowProfileList(true);
            }
          }}
          onCreateProfile={handleCreateProfileSubmit}
          isCreating={isCreating}
        />
      </div>
    );
  }

  // Show profile list if no profile is selected or if explicitly shown
  if (showProfileList || !selectedProfile) {
    return (
      <div className='flex h-[600px] w-[400px] overflow-hidden'>
        <ProfileList
          profiles={profiles}
          onSelectProfile={handleSelectProfile}
          onCreateProfile={handleCreateProfile}
          isLoading={isLoadingProfiles}
        />
      </div>
    );
  }

  // Show main screen with sidebar and bookmarks
  return (
    <div className='flex h-[600px] w-[400px] overflow-hidden'>
      <Sidebar
        onLogout={() => {
          handleLogout();
          // Clear selected profile on logout
          localStorage.removeItem(SELECTED_PROFILE_KEY);
        }}
        browsers={browsers}
        onShowAddBrowser={handleCreateProfile}
      />
      <div className='flex-1 h-full min-w-0'>
        <Bookmark
          profile={
            selectedProfile
              ? {
                  id: selectedProfile.id,
                  name: selectedProfile.name,
                  icon: (
                    <div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center'>
                      <span className='text-primary font-semibold text-xs'>
                        {selectedProfile.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ),
                }
              : {
                  id: 'default',
                  name: 'No Profile Selected',
                  icon: <div className='w-6 h-6 bg-gray-400 rounded' />,
                }
          }
        />
      </div>
    </div>
  );
};

export default App;
