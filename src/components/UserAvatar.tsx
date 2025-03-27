
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  className?: string;
  showName?: boolean;
}

const UserAvatar = ({ className = "", showName = false }: UserAvatarProps) => {
  const { user } = useAuth();
  const [initials, setInitials] = useState("?");
  const [fullName, setFullName] = useState("");
  
  useEffect(() => {
    if (user) {
      const userMetadata = user.user_metadata as { full_name?: string };
      const name = userMetadata?.full_name || user.email || "";
      setFullName(name);
      
      // Generate initials
      if (name) {
        const parts = name.split(' ');
        if (parts.length > 1) {
          setInitials(`${parts[0][0]}${parts[parts.length - 1][0]}`);
        } else if (name.length > 0) {
          setInitials(name[0]);
        }
      } else if (user.email) {
        setInitials(user.email[0]);
      }
    }
  }, [user]);
  
  if (!user) return null;
  
  return (
    <div className="flex items-center space-x-2">
      <Avatar className={`h-8 w-8 ${className}`}>
        <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="User" />
        <AvatarFallback className="bg-tutor-orange text-white">{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      {showName && fullName && (
        <div className="text-tutor-dark-gray">
          <p className="font-medium text-sm">{fullName}</p>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
