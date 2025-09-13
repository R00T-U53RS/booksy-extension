import { useState, useEffect } from 'react';
import { ArrowLeft, Monitor, Smartphone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NewBrowserFormData,
  BrowserType,
  BrowserDetectionResult,
} from '@/components/types/browser';
import {
  detectCurrentBrowser,
  getAvailableBrowsers,
} from '@/lib/browserDetection';
import { chrome, brave, firefox, safari, edge, opera } from '@/assets/assets';

interface AddBrowserProps {
  onBack: () => void;
  onCreateBrowser: (browserData: NewBrowserFormData) => void;
}

const AddBrowser = ({ onBack, onCreateBrowser }: AddBrowserProps) => {
  const [formData, setFormData] = useState<NewBrowserFormData>({
    name: '',
    type: detectCurrentBrowser(),
    profileName: 'Default',
    autoDetected: true,
  });

  const [availableBrowsers, setAvailableBrowsers] = useState<
    BrowserDetectionResult[]
  >([]);
  const [selectedBrowser, setSelectedBrowser] =
    useState<BrowserDetectionResult | null>(null);

  useEffect(() => {
    const browsers = getAvailableBrowsers();
    setAvailableBrowsers(browsers);

    // Auto-select current browser
    const current = browsers.find(b => b.type === detectCurrentBrowser());
    if (current) {
      setSelectedBrowser(current);
      setFormData(prev => ({
        ...prev,
        type: current.type,
        name: `${current.name} - ${prev.profileName}`,
      }));
    }
  }, []);

  const getBrowserIcon = (type: BrowserType) => {
    const iconMap = {
      chrome: <img src={chrome} alt='Chrome' className='w-6 h-6' />,
      firefox: <img src={firefox} alt='Firefox' className='w-6 h-6' />,
      safari: <img src={safari} alt='Safari' className='w-6 h-6' />,
      edge: <img src={edge} alt='Edge' className='w-6 h-6' />,
      brave: <img src={brave} alt='Brave' className='w-6 h-6' />,
      opera: <img src={opera} alt='Opera' className='w-6 h-6' />,
      other: <Monitor className='w-6 h-6 text-gray-500' />,
    };
    return iconMap[type];
  };

  const handleBrowserSelect = (browser: BrowserDetectionResult) => {
    setSelectedBrowser(browser);
    setFormData(prev => ({
      ...prev,
      type: browser.type,
      name: `${browser.name} - ${prev.profileName}`,
      autoDetected: browser.isInstalled,
    }));
  };

  const handleProfileChange = (profileName: string) => {
    setFormData(prev => ({
      ...prev,
      profileName,
      name: selectedBrowser
        ? `${selectedBrowser.name} - ${profileName}`
        : prev.name,
    }));
  };

  const handleCustomNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
  };

  const handleSubmit = () => {
    if (formData.name.trim() && formData.profileName.trim()) {
      onCreateBrowser(formData);
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
        >
          <ArrowLeft className='w-4 h-4' />
        </Button>
        <h2 className='text-lg font-semibold text-foreground'>Add Browser</h2>
      </div>

      <div className='flex-1 overflow-y-auto hide-scrollbar p-4 space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-sm font-semibold text-foreground'>
            Select Browser
          </h3>

          <div className='grid grid-cols-1 gap-2'>
            {availableBrowsers.map(browser => (
              <button
                key={browser.type}
                onClick={() => handleBrowserSelect(browser)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left
                  ${
                    selectedBrowser?.type === browser.type
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground bg-card'
                  }
                `}
              >
                <div className='flex items-center justify-center w-8 h-8'>
                  {getBrowserIcon(browser.type)}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='text-sm font-medium text-foreground truncate'>
                    {browser.name}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {browser.isInstalled ? '✓ Detected' : 'Not detected'}
                  </div>
                </div>
                {browser.isInstalled && (
                  <div className='w-2 h-2 bg-green-500 rounded-full' />
                )}
              </button>
            ))}
          </div>
        </div>

        {selectedBrowser && (
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold text-foreground'>
              Browser Profile
            </h3>

            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Select Profile
              </label>
              <div className='grid grid-cols-1 gap-2'>
                {selectedBrowser.profiles.map(profile => (
                  <button
                    key={profile}
                    onClick={() => handleProfileChange(profile)}
                    className={`
                      flex items-center gap-2 p-2 rounded border transition-all text-left text-sm
                      ${
                        formData.profileName === profile
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-muted-foreground bg-card text-foreground'
                      }
                    `}
                  >
                    <Smartphone className='w-4 h-4' />
                    {profile}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className='space-y-4'>
          <h3 className='text-sm font-semibold text-foreground'>
            Connection Details
          </h3>

          <div className='space-y-2'>
            <label className='text-xs font-medium text-muted-foreground'>
              Display Name
            </label>
            <Input
              placeholder='e.g., Chrome - Work Account'
              value={formData.name}
              onChange={e => handleCustomNameChange(e.target.value)}
              className='h-8 text-sm'
            />
            <p className='text-xs text-muted-foreground'>
              This name will appear in your sidebar
            </p>
          </div>
        </div>

        <div className='p-3 bg-muted/50 rounded-lg border border-border'>
          <div className='flex items-start gap-2'>
            <div className='text-xs text-muted-foreground'>
              <p className='font-medium text-foreground mb-1'>How it works:</p>
              <p>
                • We'll connect to your {selectedBrowser?.name || 'browser'}{' '}
                bookmarks
              </p>
              <p>• Bookmarks will be synced and searchable</p>
              <p>• Your data stays secure and private</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-2 p-4 border-t border-border bg-card'>
        <Button
          variant='outline'
          onClick={onBack}
          className='flex-1 h-8 text-sm'
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formData.name.trim() || !formData.profileName.trim()}
          className='flex-2 h-8 text-sm'
        >
          Sync Bookmarks
        </Button>
      </div>
    </div>
  );
};

export default AddBrowser;
