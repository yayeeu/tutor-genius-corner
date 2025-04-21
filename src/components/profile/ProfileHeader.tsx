
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '@/components/UserAvatar';

const ProfileHeader = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center text-center pb-8">
      <UserAvatar className="h-24 w-24 mb-4" />
      <h1 className="text-2xl font-bold text-tutor-navy">{user?.email}</h1>
      <p className="text-tutor-gray">Student</p>
    </div>
  );
};

export default ProfileHeader;
