import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateProfileRequest } from '@/api/profile';

interface CreateProfileProps {
  onBack: () => void;
  onCreateProfile: (data: CreateProfileRequest) => void;
  isCreating?: boolean;
}

const CreateProfile = ({
  onBack,
  onCreateProfile,
  isCreating,
}: CreateProfileProps) => {
  const [formData, setFormData] = useState<CreateProfileRequest>({
    name: '',
    description: '',
  });

  const handleSubmit = () => {
    if (formData.name.trim()) {
      onCreateProfile({
        name: formData.name.trim(),
        description: formData.description?.trim() || undefined,
      });
    }
  };

  return (
    <div className='flex flex-col h-full w-full bg-background'>
      <div className='flex items-center gap-3 p-4 border-b border-border bg-card'>
        <Button
          variant='outline'
          size='icon'
          onClick={onBack}
          className='h-8 w-8'
          disabled={isCreating}
        >
          <ArrowLeft className='w-4 h-4' />
        </Button>
        <h2 className='text-lg font-semibold text-foreground'>
          Create Profile
        </h2>
      </div>

      <div className='flex-1 overflow-y-auto p-6 space-y-6'>
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>
            Profile Name <span className='text-destructive'>*</span>
          </label>
          <Input
            placeholder='e.g., Work Profile, Personal Profile'
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
            className='h-10'
            disabled={isCreating}
          />
          <p className='text-xs text-muted-foreground'>
            A unique name to identify this profile
          </p>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>
            Description{' '}
            <span className='text-muted-foreground'>(optional)</span>
          </label>
          <Input
            placeholder='e.g., Bookmarks for work projects'
            value={formData.description || ''}
            onChange={e =>
              setFormData(prev => ({ ...prev, description: e.target.value }))
            }
            className='h-10'
            disabled={isCreating}
          />
          <p className='text-xs text-muted-foreground'>
            Additional information about this profile
          </p>
        </div>
      </div>

      <div className='flex gap-2 p-4 border-t border-border bg-card'>
        <Button
          variant='outline'
          onClick={onBack}
          className='flex-1 h-10 text-sm'
          disabled={isCreating}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formData.name.trim() || isCreating}
          className='flex-2 h-10 text-sm'
        >
          {isCreating ? 'Creating...' : 'Create Profile'}
        </Button>
      </div>
    </div>
  );
};

export default CreateProfile;
