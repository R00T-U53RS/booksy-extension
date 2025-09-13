import { ReactNode } from 'react';

export type BrowserType =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'edge'
  | 'opera'
  | 'brave'
  | 'other';

export interface Browser {
  id: string;
  name: string;
  type: BrowserType;
  profileName: string;
  icon: ReactNode;
  isConnected: boolean;
  bookmarkCount?: number;
  lastSync?: Date;
}

export interface NewBrowserFormData {
  name: string;
  type: BrowserType;
  profileName: string;
  autoDetected?: boolean;
}

export interface BrowserDetectionResult {
  type: BrowserType;
  name: string;
  profiles: string[];
  isInstalled: boolean;
}

export interface BrowserDisplayInfo {
  id: string;
  name: string;
  icon: ReactNode;
}
