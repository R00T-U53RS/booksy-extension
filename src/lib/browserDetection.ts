import {
  BrowserType,
  BrowserDetectionResult,
} from '@/components/types/browser';

export const detectCurrentBrowser = (): BrowserType => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
    if (userAgent.includes('brave')) return 'brave';
    return 'chrome';
  }
  if (userAgent.includes('firefox')) return 'firefox';
  if (userAgent.includes('safari') && !userAgent.includes('chrome'))
    return 'safari';
  if (userAgent.includes('edg')) return 'edge';
  if (userAgent.includes('opera') || userAgent.includes('opr')) return 'opera';

  return 'other';
};

export const getAvailableBrowsers = (): BrowserDetectionResult[] => {
  const currentBrowser = detectCurrentBrowser();

  return [
    {
      type: 'chrome',
      name: 'Google Chrome',
      profiles: ['Default', 'Profile 1', 'Work'],
      isInstalled: currentBrowser === 'chrome',
    },
    {
      type: 'brave',
      name: 'Brave Browser',
      profiles: ['Default'],
      isInstalled: currentBrowser === 'brave',
    },
    {
      type: 'firefox',
      name: 'Mozilla Firefox',
      profiles: ['default-release', 'dev-edition'],
      isInstalled: currentBrowser === 'firefox',
    },
    {
      type: 'safari',
      name: 'Safari',
      profiles: ['Default'],
      isInstalled: currentBrowser === 'safari',
    },
    {
      type: 'edge',
      name: 'Microsoft Edge',
      profiles: ['Default', 'Profile 1'],
      isInstalled: currentBrowser === 'edge',
    },
    {
      type: 'opera',
      name: 'Opera',
      profiles: ['Default'],
      isInstalled: currentBrowser === 'opera',
    },
  ];
};
