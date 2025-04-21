
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save } from 'lucide-react';

interface ProfileFormData {
  displayName: string;
  email: string;
}

const EditProfileForm = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    defaultValues: {
      displayName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Implement profile update logic here
      toast({
        title: t('profile.profileUpdated'),
        description: t('profile.profileUpdateSuccess'),
      });
    } catch (error) {
      toast({
        title: t('profile.error'),
        description: t('profile.errorUpdatingProfile'),
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="displayName">{t('profile.displayName')}</Label>
        <Input
          id="displayName"
          {...register('displayName', { required: true })}
          className="input-field"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">{t('profile.email')}</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          className="input-field"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            {t('general.saving')}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {t('general.save')}
          </span>
        )}
      </Button>
    </form>
  );
};

export default EditProfileForm;
