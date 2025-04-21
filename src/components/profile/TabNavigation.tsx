
import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Shield } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'profile', label: t('profile.tabs.profile'), icon: User },
    { id: 'security', label: t('profile.tabs.security'), icon: Shield }
  ];

  return (
    <div className="flex justify-center space-x-2 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center space-x-2 px-4 py-2 font-medium text-sm rounded-t-lg transition-colors
            ${activeTab === tab.id 
              ? 'text-tutor-orange border-b-2 border-tutor-orange' 
              : 'text-tutor-gray hover:text-tutor-dark-orange'}
          `}
        >
          <tab.icon className="h-4 w-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
