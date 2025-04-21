import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import TabNavigation from '@/components/profile/TabNavigation';
import EditProfileForm from '@/components/profile/EditProfileForm';
import ChangePasswordForm from '@/components/profile/ChangePasswordForm';
import NotificationSettings from '@/components/profile/NotificationSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Bell, Info, Trash2, LogOut, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
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

  return (
    <div className="min-h-screen bg-aku-cream/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <ProfileHeader />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="space-y-6">
          {activeTab === 'profile' ? (
            <>
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

              {/* Language selector temporarily hidden */}
              

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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-tutor-orange" />
                    {t('profile.changePassword')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChangePasswordForm />
                </CardContent>
              </Card>

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

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    {t('profile.dangerZone')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
