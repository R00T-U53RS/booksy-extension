import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookmarkSet } from '@/api/bookmarkSet';

interface ProfileListProps {
  profiles: BookmarkSet[];
  onSelectProfile: (profile: BookmarkSet) => void;
  onCreateProfile: () => void;
  isLoading?: boolean;
}

const ProfileList = ({
  profiles,
  onSelectProfile,
  onCreateProfile,
  isLoading,
}: ProfileListProps) => {
  if (isLoading) {
    return (
      <div className='flex flex-col h-full w-full bg-background items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
          <p className='text-sm text-muted-foreground'>Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full w-full bg-background'>
      <div className='p-6 pb-4 border-b border-border'>
        <h2 className='text-xl font-bold text-foreground mb-2'>
          Select Profile
        </h2>
        <p className='text-sm text-muted-foreground'>
          Choose a profile to continue or create a new one
        </p>
      </div>

      <div className='flex-1 overflow-y-auto p-6'>
        {profiles.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full gap-4'>
            <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center'>
              <Plus className='w-8 h-8 text-muted-foreground' />
            </div>
            <div className='text-center'>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                No Profiles Found
              </h3>
              <p className='text-sm text-muted-foreground mb-6'>
                Create your first profile to get started
              </p>
            </div>
            <Button onClick={onCreateProfile} className='w-full'>
              <Plus className='w-4 h-4 mr-2' />
              Create Profile
            </Button>
          </div>
        ) : (
          <div className='space-y-3'>
            {profiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => onSelectProfile(profile)}
                className='w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary bg-card hover:bg-accent transition-all cursor-pointer text-left'
              >
                <div className='flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center'>
                  <span className='text-primary font-semibold text-lg'>
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className='flex-1'>
                  <div className='font-semibold text-foreground'>
                    {profile.name}
                  </div>
                  {profile.description && (
                    <div className='text-sm text-muted-foreground mt-1'>
                      {profile.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
            <Button
              variant='outline'
              onClick={onCreateProfile}
              className='w-full mt-4'
            >
              <Plus className='w-4 h-4 mr-2' />
              Create New Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
