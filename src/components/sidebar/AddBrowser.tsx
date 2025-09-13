import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

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
      chrome: <img src={chrome} alt='Chrome' />,
      firefox: <img src={firefox} alt='Firefox' />,
      safari: <img src={safari} alt='Safari' />,
      edge: <img src={edge} alt='Edge' />,
      brave: <img src={brave} alt='Brave' />,
      opera: <img src={opera} alt='Opera' />,
      other: <div className='w-6 h-6 bg-gray-400 rounded' />,
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

  const handleCustomNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
  };

  const handleSubmit = () => {
    if (formData.name.trim()) {
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

          <div className='grid grid-cols-2 gap-4'>
            {availableBrowsers.map(browser => (
              <button
                key={browser.type}
                onClick={() => handleBrowserSelect(browser)}
                className={`
                  relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
                  ${
                    selectedBrowser?.type === browser.type
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground bg-card'
                  }
                `}
              >
                {browser.isInstalled && (
                  <div className='absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full' />
                )}
                <div className='flex items-center justify-center w-8 h-8'>
                  {getBrowserIcon(browser.type)}
                </div>
                <div className='text-sm font-medium text-foreground text-center'>
                  {browser.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedBrowser && (
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold text-foreground'>
              Connection Details
            </h3>

            <div className='space-y-2'>
              <label className='text-xs font-medium text-muted-foreground'>
                Display Name
              </label>
              <Input
                placeholder={`e.g., ${selectedBrowser.name} - Work`}
                value={formData.name}
                onChange={e => handleCustomNameChange(e.target.value)}
                className='h-8 text-sm'
              />
              <p className='text-xs text-muted-foreground'>
                This name will appear in your sidebar
              </p>
            </div>
          </div>
        )}

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
          disabled={!formData.name.trim()}
          className='flex-2 h-8 text-sm'
        >
          Sync Bookmarks
        </Button>
      </div>
    </div>
  );
};

export default AddBrowser;
