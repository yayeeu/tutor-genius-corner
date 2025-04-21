
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Shield, Globe, Bell, User, Image as ImageIcon, Edit, Lock, Info, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import UserAvatar from '@/components/UserAvatar';
import ChangePasswordForm from '@/components/profile/ChangePasswordForm';
import EditProfileForm from '@/components/profile/EditProfileForm';
import NotificationSettings from '@/components/profile/NotificationSettings';
import LanguageSelector from '@/components/profile/LanguageSelector';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  const handleDeleteAccount = async () => {
    try {
      // Implement account deletion logic here
      toast({
        title: t('profile.accountDeleted'),
        description: t('profile.accountDeletedDescription'),
      });
    } catch (error) {
      toast({
        title: t('profile.error'),
        description: t('profile.errorDeletingAccount'),
        variant: "destructive",
      });
    }
  };

  const tabs = [
    { id: 'profile', label: t('profile.tabs.profile'), icon: User },
    { id: 'security', label: t('profile.tabs.security'), icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-aku-cream/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center pb-8">
          <UserAvatar className="h-24 w-24 mb-4" />
          <h1 className="text-2xl font-bold text-tutor-navy">{user?.email}</h1>
          <p className="text-tutor-gray">Student</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

        {/* Main Content */}
        <div className="space-y-6">
          {activeTab === 'profile' ? (
            <>
              {/* Edit Profile Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5 text-tutor-orange" />
                    {t('profile.editProfile')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EditProfileForm />
                </CardContent>
              </Card>

              {/* Language Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-tutor-orange" />
                    {t('profile.language')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LanguageSelector />
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-tutor-orange" />
                    {t('profile.notifications')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <NotificationSettings />
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-tutor-orange" />
                    {t('profile.changePassword')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChangePasswordForm />
                </CardContent>
              </Card>

              {/* Privacy and Terms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-tutor-orange" />
                    {t('profile.privacyAndTerms')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <Button variant="link" asChild>
                      <a href="/privacy" className="text-tutor-navy hover:text-tutor-orange">
                        {t('general.privacyPolicy')}
                      </a>
                    </Button>
                    <Button variant="link" asChild>
                      <a href="/terms" className="text-tutor-navy hover:text-tutor-orange">
                        {t('general.termsOfService')}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    {t('profile.dangerZone')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Delete Account Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('profile.deleteAccount')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('profile.confirmDeletion')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('profile.deletionWarning')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <Button variant="outline" onClick={() => {}}>
                          {t('general.cancel')}
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          {t('profile.confirmDelete')}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* Logout Button */}
                  <Button 
                    variant="outline" 
                    className="w-full text-destructive hover:text-destructive"
                    onClick={signOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.signOut')}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
