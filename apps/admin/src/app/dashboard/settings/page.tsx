import { Metadata } from 'next';

import SettingsHeader from '@/components/dashboard/settings/settings-header';

import SettingsTabs from '@/components/dashboard/settings/settings-tabs';

export const metadata: Metadata = {
  title: 'Innstillinger',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader />

      <SettingsTabs />
    </div>
  );
}
