
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { KeyRound } from 'lucide-react';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PasswordFormData>();

  const onSubmit = async (data: PasswordFormData) => {
    try {
      // Implement password change logic here
      toast({
        title: t('profile.passwordChanged'),
        description: t('profile.passwordChangeSuccess'),
      });
    } catch (error) {
      toast({
        title: t('profile.error'),
        description: t('profile.errorChangingPassword'),
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">{t('profile.currentPassword')}</Label>
        <Input
          id="currentPassword"
          type="password"
          {...register('currentPassword', { required: true })}
          className="input-field"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">{t('profile.newPassword')}</Label>
        <Input
          id="newPassword"
          type="password"
          {...register('newPassword', { required: true, minLength: 8 })}
          className="input-field"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('profile.confirmPassword')}</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: true,
            validate: (value) => value === watch('newPassword')
          })}
          className="input-field"
        />
      </div>

      <Button type="submit" className="w-full">
        <KeyRound className="h-4 w-4 mr-2" />
        {t('profile.updatePassword')}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
