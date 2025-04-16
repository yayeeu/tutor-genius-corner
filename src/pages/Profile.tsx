import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { User, KeyRound, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { 
      id: 'profile', 
      label: t('profile.tabs.profile'), 
      icon: User 
    },
    { 
      id: 'security', 
      label: t('profile.tabs.security'), 
      icon: KeyRound 
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileDetails user={user} />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <ProfileDetails user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-aku-cream/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl">
        <div className="border-b border-gray-200">
          <nav className="flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full py-4 px-1 text-center flex items-center justify-center space-x-2 
                  ${activeTab === tab.id 
                    ? 'border-b-2 border-aku-yellow text-aku-blue' 
                    : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                <tab.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const ProfileDetails = ({ user }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-aku-blue">
        {t('profile.personalInfo')}
      </h2>
      {/* Profile details content */}
    </div>
  );
};

const SecuritySettings = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-aku-blue">
        {t('profile.securitySettings')}
      </h2>
      {/* Security settings content */}
      <button 
        onClick={signOut} 
        className="w-full flex items-center justify-center space-x-2 bg-aku-red/10 text-aku-red py-3 rounded-lg hover:bg-aku-red/20 transition-colors"
      >
        <LogOut className="h-5 w-5" />
        <span>{t('nav.signOut')}</span>
      </button>
    </div>
  );
};

export default Profile;
