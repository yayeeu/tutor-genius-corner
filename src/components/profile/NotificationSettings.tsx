
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const NotificationSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    assignments: true,
    newContent: true,
    reminders: true,
    updates: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      
      // Here you would typically save to backend
      toast({
        title: t('profile.settingsUpdated'),
        description: t('profile.notificationSettingsUpdated'),
      });
      
      return newSettings;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="assignments" className="flex flex-col">
          <span className="font-medium">{t('profile.notifications.assignments')}</span>
          <span className="text-sm text-muted-foreground">
            {t('profile.notifications.assignmentsDesc')}
          </span>
        </Label>
        <Switch
          id="assignments"
          checked={settings.assignments}
          onCheckedChange={() => handleToggle('assignments')}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="newContent" className="flex flex-col">
          <span className="font-medium">{t('profile.notifications.newContent')}</span>
          <span className="text-sm text-muted-foreground">
            {t('profile.notifications.newContentDesc')}
          </span>
        </Label>
        <Switch
          id="newContent"
          checked={settings.newContent}
          onCheckedChange={() => handleToggle('newContent')}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="reminders" className="flex flex-col">
          <span className="font-medium">{t('profile.notifications.reminders')}</span>
          <span className="text-sm text-muted-foreground">
            {t('profile.notifications.remindersDesc')}
          </span>
        </Label>
        <Switch
          id="reminders"
          checked={settings.reminders}
          onCheckedChange={() => handleToggle('reminders')}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="updates" className="flex flex-col">
          <span className="font-medium">{t('profile.notifications.updates')}</span>
          <span className="text-sm text-muted-foreground">
            {t('profile.notifications.updatesDesc')}
          </span>
        </Label>
        <Switch
          id="updates"
          checked={settings.updates}
          onCheckedChange={() => handleToggle('updates')}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
